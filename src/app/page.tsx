import { SignInForm } from "@/components/forms/signInForm";
import LanguageSwitcher from "@/components/toggle/lang";

/**
 * Renders the main page layout with a centered sign-in form and a language switcher positioned at the bottom right.
 */
export default function Home() {
  return (
    <div className="relative min-h-svh w-full flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignInForm />
      </div>

      <div className="absolute bottom-4 right-4">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
