import React from 'react'
import { toast } from 'sonner'
import { ClockifyForm, TimeEntriesDisplay } from '@/components/TeamsClockify'
import { getClockifyProject } from '@/hooks/clockify/getClockifyProject'
import { addClockifyLog } from '@/hooks/clockify/addClockifyLog'
import { sendTeamsMessage } from '@/hooks/teams'
import { generateTimeEntriesForDate } from '@/utils/clockify'
import type { Project } from '@/types'

function TeamsClockify() {
  const [formData, setFormData] = React.useState<Record<
    string,
    unknown
  > | null>(null)
  const [projectInfo, setProjectInfo] = React.useState<Project | null>(null)

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (formData) {
      setFormData({ ...formData, ...data })
    } else {
      setFormData(data)
    }
    const response = await getClockifyProject()
    if (response) {
      setProjectInfo({
        name: response.name,
        id: response.id,
        color: response.color,
      })
    } else {
      console.error('Failed to fetch Clockify project info')
    }
  }

  const timeEntries = React.useMemo(() => {
    if (!formData?.date || !formData?.description || !formData?.time) {
      return []
    }
    return generateTimeEntriesForDate(
      formData?.date as string,
      formData?.description as string,
      formData?.time as string
    )
  }, [formData?.date, formData?.description, formData?.time])

  const onAddClockifyLogs = async () => {
    console.log('Add Clockify Logs')
    await addClockifyLog(timeEntries)
    toast('Clockify logs added successfully!')
  }
  const onSendTeamsUpdates = async () => {
    if (formData?.description) {
      await sendTeamsMessage(formData.description as string)
    }
    toast('Teams updates sent successfully!')
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl space-y-6'>
        <ClockifyForm onSubmit={handleSubmit} />
        {timeEntries.length > 0 && (
          <TimeEntriesDisplay
            entries={timeEntries}
            selectedDate={formData?.date as string}
            onAddClockifyLogs={onAddClockifyLogs}
            onSendTeamsUpdates={onSendTeamsUpdates}
            projectInfo={projectInfo}
          />
        )}
      </div>
    </div>
  )
}

export default TeamsClockify
