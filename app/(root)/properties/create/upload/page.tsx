"use client";
import React, { useEffect, useState } from "react";

interface ImageData {
  _id: string;
  title: string;
  imageUrl: string;
  uploadedAt: string;
}

const CreatePropertyPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const API_BASE = "http://localhost:8080/api";

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Create preview when file is selected
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/images`);

      const data = await response.json();

      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !title.trim()) {
      alert("Please select an image and provide a title");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title.trim());

      const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Image uploaded successfully!");
        setSelectedFile(null);
        setTitle("");
        setPreview(null);
        fetchImages(); // Refresh the images list
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image: " + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`${API_BASE}/images/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Image deleted successfully!");
        fetchImages(); // Refresh the images list
      } else {
        throw new Error(data.error || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image: " + (error as Error).message);
    }
  };

  return (
    <main>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-4xl font-bold mb-4">Add your Property Images</h2>

          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Image Upload App
              </h1>

              {/* Upload Form */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>

                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter image title..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Maximum file size: 5MB. Supported formats: JPG, PNG, GIF,
                      etc.
                    </p>
                  </div>

                  {/* Image Preview */}
                  {preview && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Preview:
                      </p>
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-w-xs max-h-48 object-contain border rounded-md"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={uploading || !selectedFile || !title.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                </form>
              </div>

              {/* Images Gallery */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>

                {loading ? (
                  <p className="text-center text-gray-500">Loading images...</p>
                ) : images.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No images uploaded yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                      <div
                        key={image._id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-gray-800 mb-2">
                            {image.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            {new Date(image.uploadedAt).toLocaleDateString()}
                          </p>
                          <button
                            onClick={() => handleDelete(image._id)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreatePropertyPage;
