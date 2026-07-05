"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { storeProducts, type ProductRecord } from "@/data/catalog-data";

const CART_STORAGE_KEY = "eagle-leap-cart";

type StoredCartItem = {
  slug: string;
  quantity: number;
};

export type CartItem = StoredCartItem & {
  product: ProductRecord;
  lineTotal: number;
  unitPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (slug: string) => void;
  buyNow: (slug: string) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function getPriceValue(priceLabel: string) {
  return Number(priceLabel.replace(/[^0-9]/g, ""));
}

function parseStoredCart(value: string | null): StoredCartItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item): item is StoredCartItem =>
          Boolean(item) &&
          typeof item.slug === "string" &&
          typeof item.quantity === "number" &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0,
      )
      .map((item) => ({
        slug: item.slug,
        quantity: Math.max(1, Math.floor(item.quantity)),
      }));
  } catch {
    return [];
  }
}

function getProductForCart(slug: string, products: ProductRecord[]) {
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return null;
  }

  if (product.format !== "Hard Copy" && product.format !== "Both") {
    return null;
  }

  return product;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>([]);
  const [products, setProducts] = useState<ProductRecord[]>(storeProducts);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStoredItems(parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY)).filter((item) => Boolean(getProductForCart(item.slug, storeProducts))));
    setHydrated(true);
  }, []);

  useEffect(() => {
    let active = true;

    const loadCatalog = async () => {
      try {
        const response = await fetch("/api/cms", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { products?: ProductRecord[] };

        if (active && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch {
        // Keep the fallback static catalog if the CMS endpoint is unavailable.
      }
    };

    const handleRefresh = () => {
      void loadCatalog();
    };

    void loadCatalog();
    window.addEventListener("focus", handleRefresh);
    window.addEventListener("eagle-leap-cms-updated", handleRefresh);

    return () => {
      active = false;
      window.removeEventListener("focus", handleRefresh);
      window.removeEventListener("eagle-leap-cms-updated", handleRefresh);
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedItems));
  }, [isHydrated, storedItems]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    setStoredItems((current) => current.filter((item) => Boolean(getProductForCart(item.slug, products))));
  }, [isHydrated, products]);

  const items = useMemo(
    () =>
      storedItems.flatMap((item) => {
        const product = getProductForCart(item.slug, products);

        if (!product) {
          return [];
        }

        const unitPrice = getPriceValue(product.price);

        return [
          {
            ...item,
            product,
            unitPrice,
            lineTotal: unitPrice * item.quantity,
          },
        ];
      }),
    [products, storedItems],
  );

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.lineTotal, 0), [items]);

  const addItem = (slug: string) => {
    const product = getProductForCart(slug, products);

    if (!product) {
      toast.error("This title is not available for cart purchase.");
      return;
    }

    setStoredItems((current) => {
      const existing = current.find((item) => item.slug === slug);

      if (existing) {
        return current.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...current, { slug, quantity: 1 }];
    });

    setCartOpen(true);
    toast.success(`${product.title} added to cart.`);
  };

  const buyNow = (slug: string) => {
    const product = getProductForCart(slug, products);

    if (!product) {
      toast.error("This title is not available for cart purchase.");
      return;
    }

    let alreadyInCart = false;

    setStoredItems((current) => {
      const existing = current.find((item) => item.slug === slug);

      if (existing) {
        alreadyInCart = true;
        return current;
      }

      return [...current, { slug, quantity: 1 }];
    });

    setCartOpen(true);
    toast.success(alreadyInCart ? `${product.title} is already in your cart.` : `${product.title} is ready for checkout.`);
  };

  const removeItem = (slug: string) => {
    const product = products.find((item) => item.slug === slug);

    setStoredItems((current) => current.filter((item) => item.slug !== slug));

    if (product) {
      toast.success(`${product.title} removed from cart.`);
    }
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }

    setStoredItems((current) =>
      current.map((item) => (item.slug === slug ? { ...item, quantity: Math.max(1, Math.floor(quantity)) } : item)),
    );
  };

  const clearCart = () => {
    setStoredItems([]);
    toast.success("Your cart has been cleared.");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isCartOpen,
        setCartOpen,
        addItem,
        buyNow,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside a CartProvider.");
  }

  return value;
}
