"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { GithubIcon, GoogleIcon } from "../icons";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async function (userEmail: string, userPassword: string) {
    const result = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    });

    if (!result?.ok) {
      toast("Login failed!", {
        description: "The email and password you entered is incorrect",
        action: {
          label: "Retry",
          onClick: () => console.log("Retry"),
        },
      });
    }

    if (result && !result.error) {
      router.replace("/properties");
    }
  };

  const handleSubmit = async function (e: FormEvent) {
    e.preventDefault();
    const enteredEmail = email;
    const enteredPassword = password;

    signInUser(enteredEmail, enteredPassword);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-lg bg-white/80"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-blue-600 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="rounded-lg bg-white/80"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login with Email <Mail />
                </Button>
                {/* <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    signIn("google", { callbackUrl: "/properties" })
                  }
                >
                  Login with Google <GoogleIcon />
                </Button> */}
                {/* <Button variant="outline" className="w-full" disabled>
                  Login with Github <GithubIcon />
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-medium text-orange-600">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
