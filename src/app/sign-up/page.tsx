import { SignUpForm } from "@/components/forms/signUpForm";

/**
 * Renders the sign-up page layout with a centered sign-up form.
 *
 * Displays the {@link SignUpForm} component within a styled container for user registration.
 */
export default function SignUp() {
  return (
    <div className="relative min-h-svh w-full flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignUpForm />
      </div>
    </div>
  );
}
