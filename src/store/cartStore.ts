"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariant, CartItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  hasHydrated: boolean;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setHasHydrated: (state: boolean) => void;

  // Computed values
  totalItems: () => number;
  subtotalPrice: () => number;
  totalDiscount: () => number;
  shippingCost: () => number;
  finalPrice: () => number;
}

const FREE_SHIPPING_THRESHOLD = 5000000; // 5 Million Tomans
const STANDARD_SHIPPING_FEE = 150000; // 150,000 Tomans

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (product: Product, quantity = 1, variant?: ProductVariant) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              (item.selectedVariant?.id === variant?.id)
          );

          let newItems: CartItem[];
          if (existingIndex > -1) {
            newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
          } else {
            newItems = [
              ...state.items,
              {
                product,
                quantity,
                selectedVariant: variant,
              },
            ];
          }

          return {
            items: newItems,
            isCartOpen: true, // Auto open drawer when added
          };
        });
      },

      removeItem: (productId: string, variantId?: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedVariant?.id === variantId
              )
          ),
        }));
      },

      updateQuantity: (productId: string, quantity: number, variantId?: string) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedVariant?.id === variantId
            ) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      subtotalPrice: () => {
        return get().items.reduce((acc, item) => {
          const variantModifier = item.selectedVariant?.priceModifier || 0;
          const basePrice = item.product.price + variantModifier;
          return acc + basePrice * item.quantity;
        }, 0);
      },

      totalDiscount: () => {
        return get().items.reduce((acc, item) => {
          if (!item.product.originalPrice) return acc;
          const discountDiff = item.product.originalPrice - item.product.price;
          return acc + discountDiff * item.quantity;
        }, 0);
      },

      shippingCost: () => {
        const subtotal = get().subtotalPrice();
        if (subtotal === 0) return 0;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
      },

      finalPrice: () => {
        const subtotal = get().subtotalPrice();
        if (subtotal === 0) return 0;
        return subtotal + get().shippingCost();
      },
    }),
    {
      name: "aureon-cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
