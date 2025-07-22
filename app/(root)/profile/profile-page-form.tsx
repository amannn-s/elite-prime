"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";

const ProfilePageForm = ({ userDetails }) => {
  const {
    user: {
      preferences,
      _id,
      name,
      email,
      providers,
      role,
      isEmailVerified,
      avatar,
    },
  } = userDetails;
  //   console.log(userDetails);

  const [fullName, setFullName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p className="text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 space-y-4">
            <div>
              <Image
                src={avatar}
                alt={name}
                width={100}
                height={100}
                className="rounded"
              />
            </div>
            <div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  {!isEmailVerified && (
                    <small className="text-red-500">
                      Your email is not verified yet!
                    </small>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePageForm;
