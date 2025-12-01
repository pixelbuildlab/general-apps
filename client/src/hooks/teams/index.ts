import { getConfig } from '@/utils/getConfig'

export const sendTeamsMessage = async (message: string) => {
  const teamsPayload = { message }

  const teamsEndpoint = getConfig('VITE_API_ENDPOINT')
  const url = teamsEndpoint + '/send-teams-message'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamsPayload),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Failed to send Teams message')
  }
}
