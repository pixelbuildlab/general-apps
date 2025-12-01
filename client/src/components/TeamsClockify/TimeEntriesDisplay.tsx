import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  calculateDuration,
  calculateTotalHours,
  formatHumanReadableDate,
  formatTime,
} from '@/utils/datetime'
import { Clock, Calendar } from 'lucide-react'
import { Button } from '../ui/button'
import type { Project, TimeEntry } from '@/types'

type TimeEntriesDisplayProps = {
  entries: TimeEntry[]
  selectedDate?: string
  onAddClockifyLogs: () => void
  onSendTeamsUpdates: () => void
  projectInfo?: Project | null
  addforDate: () => void
}

export function TimeEntriesDisplay({
  entries,
  selectedDate,
  onAddClockifyLogs,
  onSendTeamsUpdates,
  projectInfo,
  addforDate,
}: TimeEntriesDisplayProps) {
  const totalTime = calculateTotalHours(entries)
  const [isClockifyLogsAdded, setIsClockifyLogsAdded] = React.useState(false)
  const [isTeamsUpdatesSent, setIsTeamsUpdatesSent] = React.useState(false)

  const _onAddClockifyLogs = () => {
    setIsClockifyLogsAdded(true)
    onAddClockifyLogs()
  }
  const _onSendTeamsUpdates = () => {
    setIsTeamsUpdatesSent(true)
    onSendTeamsUpdates()
  }

  return (
    <Card className='border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-5 w-5 text-white' />
            <CardTitle className='text-xl font-bold text-white'>
              {`Log Entries for ${formatHumanReadableDate(selectedDate)}`}
            </CardTitle>
          </div>
          <div className='text-right'>
            <div className='text-sm text-gray-400'>Total Time</div>
            <div className='text-lg font-bold text-green-400'>{totalTime}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        {entries.map((entry, index) => (
          <div
            key={index}
            className='bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1'>
                <p className='text-white text-sm leading-relaxed mb-3'>
                  {entry.description}
                </p>
                <div className='flex items-center gap-4 text-xs text-gray-400'>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    <span>
                      {formatTime(entry.start)} - {formatTime(entry.end)}
                    </span>
                  </div>
                  <div className='bg-gray-700 px-2 py-1 rounded text-gray-300'>
                    {calculateDuration(entry.start, entry.end)}
                  </div>
                  {projectInfo && (
                    <div
                      className='bg-gray-700 px-2 py-1 rounded text-gray-300'
                      style={{ backgroundColor: projectInfo.color }}
                    >
                      {projectInfo.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex justify-end gap-2 mt-4'>
        {/* {isClockifyLogsAdded && ( */}
        <Button
          className='bg-white text-black hover:bg-gray-200 font-semibold cursor-pointer'
          onClick={addforDate}
          // disabled={isClockifyLogsAdded}
          title={
            isClockifyLogsAdded ? 'Logs already added' : 'Add Clockify Logs'
          }
        >
          Add for date
        </Button>
        {/* )} */}
        <Button
          className='bg-white text-black hover:bg-gray-200 font-semibold cursor-pointer hidden'
          onClick={_onAddClockifyLogs}
          disabled={true}
          title={
            isClockifyLogsAdded ? 'Logs already added' : 'Add Clockify Logs'
          }
        >
          Add Clockify Logs
        </Button>
        <Button
          className='bg-blue-600 text-white hover:bg-blue-700 font-semibold cursor-pointer hidden'
          onClick={_onSendTeamsUpdates}
          disabled={isTeamsUpdatesSent}
          title={
            isTeamsUpdatesSent ? 'Updates already sent' : 'Send Teams Updates'
          }
        >
          Send Teams Updates
        </Button>
      </CardFooter>
    </Card>
  )
}
