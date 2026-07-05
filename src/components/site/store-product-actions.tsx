"use client";

import Link from "next/link";

import { useCart } from "@/contexts/cart-context";

import { Button } from "../ui/button";

type StoreProductActionsProps = {
  productSlug: string;
  isEbook: boolean;
  isHardCopy: boolean;
};

export function StoreProductActions({ productSlug, isEbook, isHardCopy }: StoreProductActionsProps) {
  const { addItem, buyNow } = useCart();

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {isHardCopy ? (
        <>
          <Button className="gradient-accent text-accent-foreground" onClick={() => buyNow(productSlug)}>
            Buy Now
          </Button>
          <Button variant="outline" onClick={() => addItem(productSlug)}>
            Add to Cart
          </Button>
        </>
      ) : null}
      {isEbook ? (
        <>
          <Button asChild className="gradient-accent text-accent-foreground">
            <Link href={`/ebook-reader/${productSlug}`}>Read Now</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/ebook-reader/${productSlug}`}>Preview</Link>
          </Button>
        </>
      ) : null}
    </div>
  );
}
