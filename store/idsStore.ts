import { create } from "zustand"

interface IdsState {
  cartId: string
  wishlistId: string
  setCartId: (id: string) => void
  setWishlistId: (id: string) => void
  resetIds: () => void
}

export const useIdsStore = create<IdsState>((set) => ({
  cartId: "",
  wishlistId: "",
  setCartId: (id) => set({ cartId: id }),
  setWishlistId: (id) => set({ wishlistId: id }),
  resetIds: () =>
    set({
      cartId: "",
      wishlistId: "",
    }),
}))
