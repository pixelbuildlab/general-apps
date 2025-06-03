import { getConfig } from '@/utils/getConfig'

export async function addClockifyLog(data: Array<unknown>) {
  const url = getConfig('VITE_CLOCKIFY_API_ENDPOINT')
  const workspaceId = getConfig('VITE_WORKSPACE_ID')
  const apiKey = getConfig('VITE_CLOCKIFY_API_KEY')
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
}
