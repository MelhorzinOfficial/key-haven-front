"use client";

import { useState } from "react";
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
import { useSignUp } from "@/http/auth/SignUp";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(12, "A senha deve ter pelo menos 12 caracteres"),
    confirmPassword: z
      .string()
      .min(12, "A senha deve ter pelo menos 12 caracteres"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,

    {
      message: "As senhas não coincidem.",
      path: ["confirmPassword"],
    }
  );

type SignupForm = z.infer<typeof signupSchema>;

/**
 * Renders a user registration form with validation, password visibility toggles, and alternative sign-up options.
 *
 * The form collects name, email, password, and password confirmation, enforcing validation rules and displaying inline errors. On successful registration, the user is redirected to the home page. Includes options for signing up with GitHub or Google and links to login, terms, and privacy policies.
 *
 * @remark The form disables submission and alternative sign-up buttons while a registration request is pending, and displays an error alert if registration fails.
 */
export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const t = useTranslations("sign-up");

  const { mutate: mutateSignUp, isPending, isError, error } = useSignUp();

  const onSubmit: SubmitHandler<SignupForm> = (data) =>
    handleSubmitLegacy(data);

  const handleSubmitLegacy = (form: SignupForm) => {
    const { name, email, password } = form;
    mutateSignUp(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
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
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...register("name", { required: true })}
                  className={cn(errors.name && "border-red-500")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                  className={cn(errors.email && "border-red-500")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    {...register("password")}
                    className={cn(errors.password && "border-red-500")}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
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
                {errors.password && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{t("confirm_password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    {...register("confirmPassword")}
                    className={cn(errors.confirmPassword && "border-red-500")}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword ? "password-error" : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.confirmPassword.message}
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
                  t("register")
                )}
              </Button>
            </div>

            {isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error.message || t("generic_error")}
                </AlertDescription>
              </Alert>
            )}

            <div className="text-center text-sm">
              {t("already_have_account")}{" "}
              <Link href="/" className="underline underline-offset-4">
                {t("login")}
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
