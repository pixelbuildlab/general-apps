import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AppState = {
  password: string
  workspaceId: string
  projectId: string
  apiKey: string
  protect: boolean

  setPassword: (v: string) => void
  setWorkspaceId: (v: string) => void
  setProjectId: (v: string) => void
  setApiKey: (v: string) => void
  setProtect: (v: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      password: '',
      workspaceId: '',
      projectId: '',
      apiKey: '', // not persisted
      protect: false, // true to disable lock screen

      setPassword: (v) => set({ password: v }),
      setWorkspaceId: (v) => set({ workspaceId: v }),
      setProjectId: (v) => set({ projectId: v }),
      setApiKey: (v) => set({ apiKey: v }),
      setProtect: (v) => set({ protect: v }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),

      // Only persist these keys
      partialize: (state) => ({
        workspaceId: state.workspaceId,
        projectId: state.projectId,
      }),
    }
  )
)
