"use client";

import { useState } from "react";

import type { LoginValues, RegisterValues } from "@/schemas/forms";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

type AuthPortalProps = {
  defaultTab?: "login" | "register";
  defaultRole?: LoginValues["role"];
};

export function AuthPortal({ defaultTab = "login", defaultRole = "buyer" }: AuthPortalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [loginPrefill, setLoginPrefill] = useState<Partial<LoginValues>>({
    role: defaultRole,
    email: "",
    password: "",
  });

  const handleRegistered = (values: Pick<RegisterValues, "role" | "email">) => {
    setLoginPrefill({
      role: values.role,
      email: values.email,
      password: "",
    });
    setActiveTab("login");
  };

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-secondary p-1.5">
        <TabsTrigger value="login" className="rounded-xl py-3 text-sm font-semibold data-[state=active]:text-primary">
          Login
        </TabsTrigger>
        <TabsTrigger value="register" className="rounded-xl py-3 text-sm font-semibold data-[state=active]:text-primary">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="mt-6">
        <LoginForm prefill={loginPrefill} />
      </TabsContent>
      <TabsContent value="register" className="mt-6">
        <RegisterForm onRegistered={handleRegistered} />
      </TabsContent>
    </Tabs>
  );
}
