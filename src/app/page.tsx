import LanguageSwitcher from "@/components/toggle/lang";
import { SignInForm } from "./signInForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-svh w-full flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {/* <div className="flex w-full max-w-sm flex-col gap-6">
        <SignInForm />
      </div>

      <div className="absolute bottom-4 right-4">
        <LanguageSwitcher />
      </div> */}

      <Button asChild>
        <Link href="/auth/dashboard">Vem pra caixa você também, vem</Link>
      </Button>
    </div>
  );
}
