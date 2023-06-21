import { create } from 'zustand'

export const useConfig = create((set) => ({
  config: 0,
  id:'0',
  updateId: (id) => set(() => ({ id: id })),
}))