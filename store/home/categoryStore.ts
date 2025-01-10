import { create } from "zustand"

export interface Category {
  id: number
  name: string
}

interface CategoryStoreState {
  categoryList: Category[]
  setCategoryList: (list: Category[]) => void
  selectedCategoryId: number
  setSelectedCategoryId: (index: number) => void
}

export const useCategoryStore = create<CategoryStoreState>((set) => ({
  categoryList: [],
  setCategoryList: (categoryList) => set({ categoryList }),
  selectedCategoryId: 0,
  setSelectedCategoryId: (index) => set({ selectedCategoryId: index }),
}))
