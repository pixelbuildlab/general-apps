import { useAppStore } from '@/store'
import { getConfig } from '@/utils/getConfig'

export const useGetClockifyProject = () => {
  const { workspaceId, apiKey, projectId } = useAppStore()
  const url = getConfig('VITE_CLOCKIFY_API_ENDPOINT')

  if (!workspaceId || !apiKey) {
    throw new Error('Workspace or api not configured')
  }
  return {
    getClockifyProject: async () => {
      const response = await fetch(
        `${url}/${workspaceId}/projects/${projectId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey,
          },
        }
      )

      const data = await response.json()
      return data
    },
  }
}
