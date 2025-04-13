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
import { useSignUp, SignUpRequest } from "@/http/auth/SignUp";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const t = useTranslations("sign-up");

  const { mutate: mutateSignUp, isPending, isError, error } = useSignUp();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError(t("name_required"));
      isValid = false;
    } else if (name.length < 3) {
      setNameError(t("name_min_length"));
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError(t("email_required"));
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t("invalid_email"));
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError(t("password_required"));
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(t("password_min_length"));
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data: SignUpRequest = { name, email, password };
    mutateSignUp(data, {
      onSuccess: () => {
        router.push("/sign-in");
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) validateForm();
                  }}
                  className={cn(nameError && "border-red-500")}
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? "name-error" : undefined}
                />
                {nameError && (
                  <p id="name-error" className="text-sm text-red-500">
                    {nameError}
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateForm();
                  }}
                  className={cn(emailError && "border-red-500")}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                {emailError && (
                  <p id="email-error" className="text-sm text-red-500">
                    {emailError}
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validateForm();
                    }}
                    className={cn(passwordError && "border-red-500")}
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? "password-error" : undefined}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordError && (
                  <p id="password-error" className="text-sm text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending} aria-busy={isPending}>
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
                <AlertDescription>{error.message || t("generic_error")}</AlertDescription>
              </Alert>
            )}

            <div className="text-center text-sm">
              {t("already_have_account")}{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                {t("login")}
              </Link>
            </div>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">{t("or_continue_with")}</span>
            </div>

            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                <Image src="/github.svg" alt="icon do github" width={16} height={16} className="mr-2" />
                {t("github")}
              </Button>
              <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                <Image src="/google.svg" alt="icon do google" width={16} height={16} className="mr-2" />
                {t("google")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        {t("terms_advice")} <Link href="/">{t("terms")}</Link> {t("and")} <Link href="/">{t("privacy")}</Link>.
      </div>
    </div>
  );
}
