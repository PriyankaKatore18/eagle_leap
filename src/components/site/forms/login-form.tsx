"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitLogin } from "@/lib/api";
import { loginSchema, type LoginValues } from "@/schemas/forms";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-destructive">{message}</p> : null;
}

type LoginFormProps = {
  prefill?: Partial<LoginValues>;
};

export function LoginForm({ prefill }: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: prefill?.role ?? "buyer",
      email: prefill?.email ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (!prefill) {
      return;
    }

    form.reset({
      role: prefill.role ?? "buyer",
      email: prefill.email ?? "",
      password: "",
    });
  }, [form, prefill]);

  const onSubmit = (values: LoginValues) => {
    startTransition(async () => {
      try {
        const response = await submitLogin(values);
        toast.success(response.message ?? "Login successful.");
        router.push(response.redirectTo ?? "/buyer");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to sign in.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Login Role *</label>
        <select
          {...form.register("role")}
          className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="buyer">Buyer Login</option>
          <option value="author">Author Dashboard</option>
          <option value="distributor">Distributor Login</option>
          <option value="admin">Admin Testing Panel</option>
        </select>
        <ErrorText message={form.formState.errors.role?.message} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Email *</label>
        <Input {...form.register("email")} type="email" className="h-12" placeholder="user@eagleleap.in" />
        <ErrorText message={form.formState.errors.email?.message} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Password *</label>
        <Input {...form.register("password")} type="password" className="h-12" placeholder="Enter your password" />
        <ErrorText message={form.formState.errors.password?.message} />
      </div>
      <div className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
        Buyer, author, and distributor users must register first. Admin login uses the seeded testing account.
      </div>
      <Button type="submit" size="lg" className="gradient-accent w-full text-accent-foreground" disabled={isPending}>
        {isPending ? "Signing in..." : "Login Securely"}
      </Button>
    </form>
  );
}
