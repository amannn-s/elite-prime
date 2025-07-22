import { SignupForm } from "@/components/forms/signup-form";
import { Button } from "@/components/ui/button";
// import { getAuthSession } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function SignUpPage() {
  // const session = await getAuthSession();

  return (
    <div className="flex min-h-svh w-full items-stretch justify-center">
      <div
        className="hidden w-full items-center justify-center bg-gradient-to-bl from-neutral-900 to-neutral-950 bg-cover bg-center md:flex"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <Button variant={"secondary"} asChild className="absolute top-4 left-4">
          <Link href={"/"}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="mb-1 w-min font-[family-name:var(--spectral)] text-7xl tracking-tighter text-neutral-800 selection:bg-pink-400 md:w-max font-bold lg:text-8xl">
          Elitt. <br />
          Prim. <br />
        </h1>
      </div>
      <div className="w-full flex justify-center items-center max-w-md p-6">
        <SignupForm />
      </div>
    </div>
  );
}
