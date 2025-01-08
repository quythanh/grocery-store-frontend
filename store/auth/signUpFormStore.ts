import { create } from "zustand"

interface SignUpFormState {
  formState: {
    firstname: string
    lastname: string
    email: string
    password: string
    gender: number
    date_of_birth: string
  }
  setFormState: (field: string, value: string | number) => void
}

export const useSignUpFormStore = create<SignUpFormState>((set) => ({
  formState: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: 1,
    date_of_birth: "",
  },
  setFormState: (field, value) =>
    set((state) => ({
      formState: {
        ...state.formState,
        [field]: value,
      },
    })),
}))
