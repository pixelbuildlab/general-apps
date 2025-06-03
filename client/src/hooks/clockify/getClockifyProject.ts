import { getConfig } from '@/utils/getConfig'

export const getClockifyProject = async () => {
  const projectId = getConfig('VITE_PROJECT_ID')
  const workspaceId = getConfig('VITE_WORKSPACE_ID')
  const url = getConfig('VITE_CLOCKIFY_API_ENDPOINT')

  const response = await fetch(`${url}/${workspaceId}/projects/${projectId}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': getConfig('VITE_CLOCKIFY_API_KEY'),
    },
  })
  const data = await response.json()
  return data
}
