"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginForm } from "../forms/login-form";
import { getAuthSession } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { status, data: session } = useSession();

  function logoutHandler() {
    signOut();
  }
  return (
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href={"/"}
              className="text-2xl font-display font-bold text-primary"
            >
              ElitePrime
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/properties"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Properties
            </Link>
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Auctions
            </a>
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              About
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <>
                <Skeleton className="h-[36px] w-[108px] rounded" />
              </>
            ) : (
              <>
                {status === "authenticated" ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Image
                          width={40}
                          height={40}
                          src={session?.user?.image}
                          alt=""
                          className="rounded-full"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={"/profile"}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logoutHandler}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Get Started</Button>
                      </DialogTrigger>
                      <DialogContent className="rounded border-0 bg-neutral-100 backdrop-blur-lg">
                        <DialogHeader>
                          <DialogTitle className="sr-only">Log in</DialogTitle>
                        </DialogHeader>
                        <LoginForm />
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </>
            )}
            {/* <Button variant="outline">Sign In</Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
