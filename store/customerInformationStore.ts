import type { Customer } from "@/types/customer"
import { create } from "zustand"

interface CustomerInfomationState {
  informationState: Customer
  setInformationField: (field: string, value: string | number) => void
  resetInformationState: () => void
}

const DEFAULT_INFO: Customer = {
  firstname: "",
  lastname: "",
  email: "",
  gender: 1,
  date_of_birth: "",
}

export const useCustomerInformationStore = create<CustomerInfomationState>(
  (set) => ({
    informationState: DEFAULT_INFO,
    setInformationField: (field, value) => {
      set((state) => ({
        informationState: {
          ...state.informationState,
          [field]: value,
        },
      }))
    },
    resetInformationState: () => {
      set((state) => ({
        informationState: DEFAULT_INFO,
      }))
    },
  })
)
