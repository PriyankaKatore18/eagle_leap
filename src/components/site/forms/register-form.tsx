"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitRegister } from "@/lib/api";
import { registerSchema, type RegisterValues } from "@/schemas/forms";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-destructive">{message}</p> : null;
}

type RegisterFormProps = {
  onRegistered?: (values: Pick<RegisterValues, "role" | "email">) => void;
};

export function RegisterForm({ onRegistered }: RegisterFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "buyer",
      name: "",
      email: "",
      phone: "",
      businessName: "",
      password: "",
    },
  });

  const role = form.watch("role");

  const onSubmit = (values: RegisterValues) => {
    startTransition(async () => {
      try {
        await submitRegister(values);
        toast.success("Account created successfully. Please log in to continue.");
        onRegistered?.({ role: values.role, email: values.email });
        form.reset({
          role: values.role,
          name: "",
          email: "",
          phone: "",
          businessName: "",
          password: "",
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to create your account.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Register As *</label>
        <select
          {...form.register("role")}
          className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="buyer">Buyer Account</option>
          <option value="author">Author Account</option>
          <option value="distributor">Distributor Account</option>
        </select>
        <ErrorText message={form.formState.errors.role?.message} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Full Name *</label>
        <Input {...form.register("name")} className="h-12" placeholder="Your full name" />
        <ErrorText message={form.formState.errors.name?.message} />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Email *</label>
          <Input {...form.register("email")} type="email" className="h-12" placeholder="you@eagleleap.in" />
          <ErrorText message={form.formState.errors.email?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Mobile Number</label>
          <Input {...form.register("phone")} className="h-12" placeholder="+91 98765 43210" />
          <ErrorText message={form.formState.errors.phone?.message} />
        </div>
      </div>
      {role === "distributor" ? (
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Distributor / Business Name *</label>
          <Input {...form.register("businessName")} className="h-12" placeholder="Campus Distribution Hub" />
          <ErrorText message={form.formState.errors.businessName?.message} />
        </div>
      ) : null}
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Password *</label>
        <Input {...form.register("password")} type="password" className="h-12" placeholder="Create a secure password" />
        <ErrorText message={form.formState.errors.password?.message} />
      </div>
      <div className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
        Buyer, author, and distributor accounts are created first and then signed in through the same secure portal.
      </div>
      <Button type="submit" size="lg" className="gradient-accent w-full text-accent-foreground" disabled={isPending}>
        {isPending ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
