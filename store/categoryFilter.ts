import { create } from "zustand"

type SortType = "desc" | "asc" | undefined
interface CategoryFilterState {
  isOpen: boolean
  available: boolean
  brands: string[]
  priceFrom: number
  priceTo: number
  star: number
  searchKey: string
  sortType: SortType
  open: () => void
  close: () => void
  toggleBrand: (brand: string) => void
  setPriceFrom: (price: number) => void
  setPriceTo: (price: number) => void
  setStar: (star: number) => void
  toggleAvailabel: () => void
  setSearchKey: (key: string) => void
  setSortType: (key: "desc" | "asc") => void
}

export const useCategoryFilterStore = create<CategoryFilterState>()((set) => ({
  isOpen: false,
  available: false,
  brands: [],
  priceFrom: 0,
  priceTo: 5,
  star: 5,
  searchKey: "",
  sortType: undefined,
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
  setSortType: (type: SortType) => set(() => ({ sortType: type })),
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
