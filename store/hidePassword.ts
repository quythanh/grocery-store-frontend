import { create } from "zustand"

interface HidePasswordState {
  hidePassword: boolean
  handleHidePassword: () => void
}

export const useHidePasswordStore = create<HidePasswordState>()((set) => ({
  hidePassword: true,
  handleHidePassword: () =>
    set((state) => ({ hidePassword: !state.hidePassword })),
}))
