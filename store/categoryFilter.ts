import { create } from "zustand"

interface CategoryFilterState {
  isOpen: boolean
  available: boolean
  brands: string[]
  priceFrom: number
  priceTo: number
  star: number
  searchKey: string
  open: () => void
  close: () => void
  toggleBrand: (brand: string) => void
  setPriceFrom: (price: number) => void
  setPriceTo: (price: number) => void
  setStar: (star: number) => void
  toggleAvailabel: () => void
  setSearchKey: (key: string) => void
}

export const useCategoryFilterStore = create<CategoryFilterState>()((set) => ({
  isOpen: false,
  available: false,
  brands: [],
  priceFrom: 0,
  priceTo: 100,
  star: 5,
  searchKey: "",
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
  toggleBrand: (brand: string) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? [...state.brands.filter((b) => b != brand)]
        : [...state.brands, brand],
    })),
  setPriceFrom: (price: number) => set(() => ({ priceFrom: price })),
  setPriceTo: (price: number) => set(() => ({ priceTo: price })),
  setStar: (star: number) => set(() => ({ star })),
  toggleAvailabel: () => set((state) => ({ available: !state.available })),
  setSearchKey: (key: string) => set(() => ({ searchKey: key })),
}))

export const allBrands = [
  "Nestlé",
  "Coca-Cola",
  "PepsiCo",
  "Unilever",
  "Kraft Heinz",
  "Danone",
  "Mars",
  "Mondelez International",
  "Tyson Foods",
  "General Mills",
]
