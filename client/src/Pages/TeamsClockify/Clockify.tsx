import React from 'react'
import { toast } from 'sonner'
import { ClockifyForm, TimeEntriesDisplay } from '@/components/TeamsClockify'
import { useGetClockifyProject } from '@/hooks/clockify/getClockifyProject'
import { useAddClockifyLogs } from '@/hooks/clockify/addClockifyLog'
import { sendTeamsMessage } from '@/hooks/teams'
import { generateTimeEntriesForDate } from '@/utils/clockify'
import type { Project } from '@/types'
import { canAddLogForDate, isWeekend } from '@/utils/datetime'
import { useAppStore } from '@/store'

function TeamsClockify() {
  const [formData, setFormData] = React.useState<Record<
    string,
    unknown
  > | null>(null)

  const { addClockifyLog } = useAddClockifyLogs()
  const { getClockifyProject } = useGetClockifyProject()

  const [formInputData, setFormInputData] = React.useState<
    Record<string, unknown>
  >({
    date: new Date().toISOString().split('T')[0],
    time: '19:00', // default to 3PM
  })

  const { projectId } = useAppStore()

  const handleValueChange = (fieldName: string, value: string) => {
    if (fieldName === 'date' && isWeekend(value)) {
      toast('Please select a week date.')
    }
    if (fieldName === 'date' && !canAddLogForDate(value)) {
      toast('Cannot add log for this date. Please select a valid date.')
    }
    setFormInputData({
      ...formInputData,
      [fieldName]: value,
    })
  }

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
      formData?.time as string,
      projectId
    )
  }, [formData?.date, formData?.description, formData?.time, projectId])

  const onAddClockifyLogs = async () => {
    console.log('Add Clockify Logs', formData)
    addClockifyLog(timeEntries)
    toast('Clockify logs added successfully!')
  }
  const onSendTeamsUpdates = async () => {
    const isAlwaysTrue = true
    if (isAlwaysTrue) {
      return
    }

    if (formData?.description) {
      await sendTeamsMessage(formData.description as string)
    }
    toast('Teams updates sent successfully!')
  }

  const addforDate = async () => {
    if (!formData?.date) {
      return
    }
    const date = new Date(formData?.date as string)
    date.setDate(date.getDate() + 1)
    const nextDay = date.toISOString().split('T')[0]
    if (isWeekend(formData?.date as string)) {
      toast('Skipping for weekends')
      setFormData({ ...formData, date: nextDay })
      setFormInputData({ ...formInputData, date: nextDay })
      return
    }

    setFormData({ ...formData, date: nextDay })
    setFormInputData({ ...formInputData, date: nextDay })
    await addClockifyLog(timeEntries)
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl space-y-6'>
        <ClockifyForm
          onSubmit={handleSubmit}
          formInputData={formInputData}
          setFormInputData={setFormInputData}
          handleValueChange={handleValueChange}
        />
        {timeEntries.length > 0 && (
          <TimeEntriesDisplay
            entries={timeEntries}
            selectedDate={formData?.date as string}
            onAddClockifyLogs={onAddClockifyLogs}
            onSendTeamsUpdates={onSendTeamsUpdates}
            projectInfo={projectInfo}
            addforDate={addforDate}
          />
        )}
      </div>
    </div>
  )
}

export default TeamsClockify
