import { create } from "zustand"

interface TokenState {
  token: string | null
  setToken: (token: string) => void
  resetToken: () => void
}

export const useTokenStore = create<TokenState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  resetToken: () => set({ token: null }),
}))
