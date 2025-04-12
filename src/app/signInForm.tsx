"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLogin, LoginRequest } from "@/http/auth/login";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import router from "next/router";

export function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const t = useTranslations("sign-in");

  const { mutate: mutateLogin, isPending, isError, error } = useLogin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data: LoginRequest = { email, password };
    mutateLogin(data, {
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Link href="/" className="ml-auto text-sm underline-offset-4 hover:underline">
                      {t("forgot_password")}
                    </Link>
                  </div>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? t("loading") : t("login")}
                </Button>
              </div>

              {/* TODO: Resolver o erro na div para ser um erro generico fornecido pelo t.(erro_generico) */}

              {isError && <div className="text-red-500 text-center">{error.message}</div>}

              <div className="text-center text-sm">
                {t("no_account")}{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  {t("register")}
                </Link>
              </div>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">{t("or_continue_with")}</span>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <Image src="/github.svg" alt="icon do github" width={16} height={16} className="mr-2" />
                  {t("github")}
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <Image src="/google.svg" alt="icon do google" width={16} height={16} className="mr-2" />
                  {t("google")}
                </Button>
              </div>
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
