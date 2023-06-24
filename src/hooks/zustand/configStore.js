import { create } from 'zustand'

export const useConfig = create((set) => ({
  id:null,
  updateId: (id) => set(() => ({ id: id })),
}))