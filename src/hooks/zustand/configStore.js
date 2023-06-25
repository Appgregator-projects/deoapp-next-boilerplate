import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useConfig = create(
	persist(
		(set) => ({
			data:{},
			updateData: (data) => set(() => ({ data: data })),
			clearData: () => set(() => ({ })),
		}),
		{
		  name: 'web-config',
		}
	)
)
