import { create } from 'zustand'

export const useConfig = create((set) => ({
  id:'0',
  updateId: (id) => set(() => ({ id: id })),
}))