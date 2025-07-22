import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import React from "react";
import ProfilePageForm from "./profile-page-form";

const ProfilePage = async () => {
  const session = await getAuthSession();
  const userId = session?.user._id;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/profile?id=${userId}`,
    {
      cache: "no-store",
    }
  );

  const userDetails = await result.json();

  return (
    <main>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="border-y py-4">
            <ul className="flex gap-6">
              <li className="text-base font-medium">Account</li>
              <li className="text-base font-medium">Notification</li>
            </ul>
          </nav>
        </div>
      </section>
      <ProfilePageForm userDetails={userDetails} />
    </main>
  );
};

export default ProfilePage;
