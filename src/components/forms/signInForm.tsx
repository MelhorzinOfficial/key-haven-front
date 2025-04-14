"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useSignIn, SignInRequest } from "@/http/auth/SignIn";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signinSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(12, "A senha deve ter pelo menos 12 caracteres"),
});

type SigninForm = z.infer<typeof signinSchema>;

/**
 * Renders a user sign-in form with validation, error handling, and options for third-party authentication.
 *
 * The form validates email and password fields, displays relevant error messages, and provides UI feedback during submission. On successful sign-in, the user is redirected to the dashboard. Includes links for password recovery, registration, and terms of service, as well as buttons for signing in with GitHub or Google.
 */
export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
  });

  const router = useRouter();

  const t = useTranslations("sign-in");

  const { mutate: mutateSignIn, isPending, isError, error } = useSignIn();

  const onSubmit: SubmitHandler<SigninForm> = (data) =>
    handleSubmitLegacy(data);

  const handleSubmitLegacy = (form: SigninForm) => {
    mutateSignIn(form, {
      onSuccess: () => {
        router.push("/auth/dashboard");
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">KeyHaven</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email", { required: true })}
                  className={cn(errors.email?.message && "border-red-500")}
                  aria-invalid={!!errors.email?.message}
                  aria-describedby={
                    errors.email?.message ? "email-error" : undefined
                  }
                />
                {errors.email?.message && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Link
                    href="/"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t("forgot_password")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className={cn(errors.password?.message && "border-red-500")}
                    aria-invalid={!!errors.password?.message}
                    aria-describedby={
                      errors.password?.message ? "password-error" : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password?.message && (
                  <p id="password-error" className="text-sm text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("loading")}
                  </div>
                ) : (
                  t("login")
                )}
              </Button>
            </div>

            {isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  { t("generic_error")}
                </AlertDescription>
              </Alert>
            )}

            <div className="text-center text-sm">
              {t("no_account")}{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                {t("register")}
              </Link>
            </div>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                {t("or_continue_with")}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isPending}
              >
                <Image
                  src="/github.svg"
                  alt="icon do github"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                {t("github")}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isPending}
              >
                <Image
                  src="/google.svg"
                  alt="icon do google"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                {t("google")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        {t("terms_advice")} <Link href="/">{t("terms")}</Link> {t("and")}{" "}
        <Link href="/">{t("privacy")}</Link>.
      </div>
    </div>
  );
}
