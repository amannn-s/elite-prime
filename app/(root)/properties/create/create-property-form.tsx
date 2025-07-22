"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, Eye } from "lucide-react";

const API_BASE = "http://localhost:8080/api";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["residential", "commercial", "industrial", "land"]),
  basePrice: z.number().min(1, "Base price must be greater than 0"),

  street: z.string().min(2, "Street must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(2, "Zip code must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),

  area: z.number().min(1, "Area must be greater than 0"),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  floors: z.number().min(0),
  parking: z.number().min(0),
  yearBuilt: z.number().min(1900, "Year built must be valid"),
});

interface UploadedImage {
  _id?: string;
  title: string;
  cloudinaryId: string;
  imageUrl: string;
  uploadedAt: string;
  file?: File; // For preview before upload
  preview?: string; // For local preview
}

const CreatePropertyForm = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "residential",
      basePrice: 0,

      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",

      area: 0,
      bedrooms: 0,
      bathrooms: 0,
      floors: 0,
      parking: 0,
      yearBuilt: 0,
    },
  });

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} is not an image.`);
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      const newImage: UploadedImage = {
        title: file.name.split(".")[0], // Use filename without extension as default title
        cloudinaryId: "",
        imageUrl: "",
        uploadedAt: new Date().toISOString(),
        file,
        preview,
      };

      setImages((prev) => [...prev, newImage]);
    });

    // Reset file input
    e.target.value = "";
  };

  // Upload single image
  const uploadImage = async (image: UploadedImage, index: number) => {
    if (!image.file || !image.title.trim()) {
      alert("Please provide a title for the image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image.file);
      formData.append("title", image.title.trim());

      const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Update the image with upload data
        setImages((prev) =>
          prev.map((img, i) =>
            i === index
              ? {
                  ...img,
                  _id: data.data._id,
                  cloudinaryId: data.data.cloudinaryId,
                  imageUrl: data.data.imageUrl,
                  uploadedAt: data.data.uploadedAt,
                  file: undefined,
                  preview: undefined,
                }
              : img
          )
        );
        return true;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image: " + (error as Error).message);
      return false;
    }
  };

  // Upload all images
  const uploadAllImages = async () => {
    setUploading(true);
    const imagesToUpload = images.filter((img) => img.file);

    if (imagesToUpload.length === 0) {
      setUploading(false);
      return true;
    }

    try {
      for (let i = 0; i < images.length; i++) {
        if (images[i].file) {
          const success = await uploadImage(images[i], i);
          if (!success) {
            setUploading(false);
            return false;
          }
        }
      }
      setUploading(false);
      return true;
    } catch (error) {
      setUploading(false);
      return false;
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    const image = images[index];

    // Revoke preview URL if it exists
    if (image.preview) {
      URL.revokeObjectURL(image.preview);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Update image title
  const updateImageTitle = (index: number, title: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, title } : img))
    );
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (images.length === 0) {
      alert("Please add at least one property image");
      return;
    }

    setSubmitting(true);

    try {
      // First upload all images
      const uploadSuccess = await uploadAllImages();
      if (!uploadSuccess) {
        setSubmitting(false);
        return;
      }

      // Prepare property data
      const propertyData = {
        title: values.title,
        description: values.description,
        type: values.type,
        basePrice: values.basePrice,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        },
        specifications: {
          area: values.area,
          bedrooms: values.bedrooms,
          bathrooms: values.bathrooms,
          floors: values.floors,
          parking: values.parking,
          yearBuilt: values.yearBuilt,
        },
        images: images.map((img) => ({
          title: img.title,
          cloudinaryId: img.cloudinaryId,
          imageUrl: img.imageUrl,
          uploadedAt: img.uploadedAt,
        })),
      };

      // Here you would send propertyData to your property creation endpoint
      console.log("Property data to submit:", propertyData);

      // For now, just log the data
      alert("Property created successfully!");

      // Reset form
      form.reset();
      setImages([]);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to create property");
    } finally {
      setSubmitting(false);
    }
  }

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              {/* Basic Information */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="i.e. 3BHK Luxury Flat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter full description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="residential">
                                Residential
                              </SelectItem>
                              <SelectItem value="commercial">
                                Commercial
                              </SelectItem>
                              <SelectItem value="industrial">
                                Industrial
                              </SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="basePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Price (₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["street", "city", "state", "zipCode", "country"].map(
                    (fieldName) => (
                      <FormField
                        key={fieldName}
                        control={form.control}
                        name={
                          fieldName as
                            | "street"
                            | "city"
                            | "state"
                            | "zipCode"
                            | "country"
                        }
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">
                              {fieldName}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Specifications */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "area",
                    "bedrooms",
                    "bathrooms",
                    "floors",
                    "parking",
                    "yearBuilt",
                  ].map((fieldName) => (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={
                        fieldName as
                          | "area"
                          | "bedrooms"
                          | "bathrooms"
                          | "floors"
                          | "parking"
                          | "yearBuilt"
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {fieldName}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold">Property Images</h3>

                {/* File Input */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="mb-4">
                    <label htmlFor="images" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Click to upload property images
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PNG, JPG, GIF up to 5MB each
                      </span>
                    </label>
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("images")?.click()}
                  >
                    Select Images
                  </Button>
                </div>

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={image.preview || image.imageUrl}
                            alt={image.title}
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {image.file && (
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                              Not uploaded
                            </div>
                          )}
                          {image.imageUrl && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                              Uploaded
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <Input
                            value={image.title}
                            onChange={(e) =>
                              updateImageTitle(index, e.target.value)
                            }
                            placeholder="Image title"
                            className="text-sm"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={submitting || uploading}
              >
                {submitting
                  ? "Creating Property..."
                  : uploading
                  ? "Uploading Images..."
                  : "Create Property"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePropertyForm;
