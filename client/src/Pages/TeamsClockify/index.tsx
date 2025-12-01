import TeamsClockify from './Clockify'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getConfig } from '@/utils/getConfig'
import { useAppStore } from '@/store'

function Page() {
  const {
    password,
    workspaceId,
    projectId,
    apiKey,
    protect,
    setPassword,
    setWorkspaceId,
    setProjectId,
    setApiKey,
    setProtect,
  } = useAppStore()

  const handleClick = () => {
    const pass = getConfig('VITE_APP_PASS')

    if (!pass) {
      throw new Error('App not configured')
    }

    if (pass === password) {
      if (!workspaceId || !projectId || !apiKey) {
        alert('Please enter Workspace ID, Project ID, and API Key')
        return
      }

      setProtect(true)
    } else {
      alert('Incorrect password')
    }
  }

  return (
    <div>
      {!(protect && apiKey) ? (
        <div className='min-h-screen bg-black flex items-center justify-center p-4'>
          <div className='w-full max-w-2xl space-y-4'>
            <Input
              id='password'
              type='password'
              placeholder='Enter password'
              className='w-full pl-4 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            <Input
              id='workspaceId'
              type='text'
              placeholder='Workspace ID'
              className='w-full pl-4 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
              value={workspaceId}
              onChange={({ target }) => setWorkspaceId(target.value)}
            />

            <Input
              id='projectId'
              type='text'
              placeholder='Project ID'
              className='w-full pl-4 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
              value={projectId}
              onChange={({ target }) => setProjectId(target.value)}
            />

            <Input
              id='apiKey'
              type='text'
              placeholder='API Key'
              className='w-full pl-4 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
              value={apiKey}
              onChange={({ target }) => setApiKey(target.value)}
            />

            <Button
              onClick={handleClick}
              type='button'
              className='w-full bg-white text-black hover:bg-gray-200 font-semibold py-2.5'
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <TeamsClockify
        // workspaceId={workspaceId}
        // projectId={projectId}
        // apiKey={apiKey}
        />
      )}
    </div>
  )
}

export default Page
