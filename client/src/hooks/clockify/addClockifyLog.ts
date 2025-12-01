import { useAppStore } from '@/store'
import { getConfig } from '@/utils/getConfig'

export function useAddClockifyLogs() {
  const { workspaceId, apiKey } = useAppStore()
  const url = getConfig('VITE_CLOCKIFY_API_ENDPOINT')

  if (!workspaceId || !apiKey) {
    throw new Error('Workspace or api not configured')
  }

  return {
    addClockifyLog: async (data: Array<unknown>) => {
      for (const entry of data) {
        const response = await fetch(`${url}/${workspaceId}/time-entries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey,
          },
          body: JSON.stringify(entry),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(errorText || 'Failed to add Clockify log')
        }

        console.log('Clockify log added successfully:', entry)
      }
    },
  }
}
