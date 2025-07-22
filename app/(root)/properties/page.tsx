"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

const PropertyPage = () => {
  return (
    <main>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-4xl font-bold mb-4">Add your Property?</h2>
          <Button asChild>
            <Link href={"/properties/create"}>Add property</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PropertyPage;
