"use client";

import { useState } from "react";
import { toast } from "sonner";

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!email) {
          return;
        }

        toast.success("Subscribed successfully.");
        setEmail("");
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        className="rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm placeholder:text-white/50 focus:border-accent focus:outline-none"
        required
      />
      <button type="submit" className="rounded-md gradient-accent px-4 py-2.5 text-sm font-semibold text-white">
        Subscribe
      </button>
    </form>
  );
}
