import { create } from 'zustand'

export const useAuth = create((set) => ({
  data:{uid:uid},
  updateAuth: (uid) => set(() => ({ uid: uid })),
}))