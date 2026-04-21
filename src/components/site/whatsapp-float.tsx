import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/data/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-white shadow-glow hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
