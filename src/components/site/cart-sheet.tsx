"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { useCart } from "@/contexts/cart-context";
import { siteConfig } from "@/data/site-config";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

function formatCurrency(amount: number) {
  return `INR ${amount.toLocaleString("en-IN")}`;
}

export function CartSheet() {
  const { items, totalItems, subtotal, isCartOpen, setCartOpen, clearCart, removeItem, updateQuantity } = useCart();

  const whatsappMessage = encodeURIComponent(
    [
      "Hello Eagle Leap, I would like to order these books:",
      ...items.map((item) => `- ${item.product.title} x${item.quantity} (${formatCurrency(item.lineTotal)})`),
      `Subtotal: ${formatCurrency(subtotal)}`,
    ].join("\n"),
  );
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full border-slate-200 bg-white text-primary hover:bg-slate-50"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
              {totalItems}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col px-5 sm:max-w-xl sm:px-6">
        <SheetHeader className="pr-8">
          <SheetTitle className="text-2xl font-extrabold text-primary">Your Cart</SheetTitle>
          <SheetDescription>
            Printed books added from the store appear here. Secure ebook titles stay in the reader flow.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/40 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-accent shadow-card">
              <ShoppingCart className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-primary">Your cart is empty</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Add a printed title from the store and it will show up here with quantity controls and order details.
            </p>
            <Button asChild className="mt-6 gradient-accent text-accent-foreground">
              <Link href="/store" onClick={() => setCartOpen(false)}>
                Browse Store
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-4 py-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-primary">{totalItems}</span> item{totalItems === 1 ? "" : "s"} in cart
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="text-sm font-semibold text-accent transition hover:text-accent/80"
              >
                Clear cart
              </button>
            </div>

            <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <article key={item.slug} className="rounded-3xl border border-border bg-card p-4 shadow-card">
                  <div className="flex gap-4">
                    <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-2xl bg-secondary">
                      <Image src={item.product.cover} alt={item.product.title} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{item.product.category}</p>
                      <h3 className="mt-2 line-clamp-2 text-base font-bold text-primary">{item.product.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.product.author}</p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-border bg-background p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="rounded-full p-2 text-primary transition hover:bg-secondary"
                            aria-label={`Decrease quantity for ${item.product.title}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-10 text-center text-sm font-bold text-primary">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            className="rounded-full p-2 text-primary transition hover:bg-secondary"
                            aria-label={`Increase quantity for ${item.product.title}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-base font-extrabold text-accent">{formatCurrency(item.lineTotal)}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Unit price: {item.product.price}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="inline-flex items-center gap-2 font-semibold text-muted-foreground transition hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-secondary/50 p-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-lg font-extrabold text-primary">{formatCurrency(subtotal)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                This storefront currently uses assisted ordering. Send your cart to our team on WhatsApp or continue to
                the contact page to complete the request.
              </p>
              <div className="mt-5 grid gap-3">
                <Button asChild className="gradient-accent text-accent-foreground">
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    Checkout on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact" onClick={() => setCartOpen(false)}>
                    Continue to Contact Form
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
