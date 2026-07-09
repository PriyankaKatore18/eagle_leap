"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitLogin } from "@/lib/api";
import { loginSchema, type LoginValues } from "@/schemas/forms";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-destructive">{message}</p> : null;
}

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "admin",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    startTransition(async () => {
      try {
        const response = await submitLogin({ ...values, role: "admin" });
        toast.success(response.message ?? "Admin login successful.");
        router.push(response.redirectTo ?? "/admin/cms");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to sign in.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
      <input type="hidden" {...form.register("role")} value="admin" />

      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Admin Username *</label>
        <Input {...form.register("email")} type="email" className="h-12" />
        <ErrorText message={form.formState.errors.email?.message} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Password *</label>
        <Input {...form.register("password")} type="password" className="h-12" />
        <ErrorText message={form.formState.errors.password?.message} />
      </div>

      <div className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
        This portal is only for Eagle Leap admin management.
      </div>

      <Button type="submit" size="lg" className="gradient-accent w-full text-accent-foreground" disabled={isPending}>
        {isPending ? "Signing in..." : "Login to Admin Panel"}
      </Button>
    </form>
  );
}
