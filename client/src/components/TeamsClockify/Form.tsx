import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import React from 'react'
import { canAddLogForDate, isWeekend } from '@/utils/datetime'
import { toast } from 'sonner'

export function ClockifyForm({
  onSubmit,
}: {
  onSubmit?: (data: Record<string, unknown>) => void
}) {
  const [formData, setFormData] = React.useState<Record<string, unknown>>({
    date: new Date().toISOString().split('T')[0],
    time: '19:00', // default to 3PM
  })

  const handleValueChange = (fieldName: string, value: string) => {
    if (fieldName === 'date' && isWeekend(value)) {
      toast('Please select a week date.')
    }
    if (fieldName === 'date' && !canAddLogForDate(value)) {
      toast('Cannot add log for this date. Please select a valid date.')
    }
    setFormData({
      ...formData,
      [fieldName]: value,
    })
  }

  const isTimeValid = (time: string) => {
    const [hours] = time.split(':').map(Number)
    return hours >= 15 && hours <= 23
  }

  const handleSubmit = () => {
    if (!formData.time || !isTimeValid(formData.time as string)) {
      alert('Time must be between 3:00 PM and 11:00 PM.')
      return
    }
    if (isWeekend(formData.date as string)) {
      toast('Please select a week date, cannot log time on weekends.')
      return
    }
    if (!canAddLogForDate(formData.date as string)) {
      toast('Cannot add log for this date. Please select a valid date.')
      return
    }

    if (onSubmit && formData) {
      onSubmit(formData)
    }
  }

  return (
    <Card className='border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-bold text-white'>
          Time Entry
        </CardTitle>
        <CardDescription className='text-gray-400'>
          Add your work activities and time.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
      >
        <CardContent className='space-y-4 pb-2'>
          <div className='space-y-2'>
            <Label
              htmlFor='message'
              className='text-white font-medium'
            >
              Description
            </Label>
            <Textarea
              id='message'
              placeholder='Describe your activities...'
              className='min-h-[120px] resize-none bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
              required
              onChange={(e) => handleValueChange('description', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='date'
              className='text-white font-medium'
            >
              Date
            </Label>
            <Input
              id='date'
              type='date'
              defaultValue={formData.date as string}
              className='w-full bg-gray-800 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600 [&::-webkit-calendar-picker-indicator]:invert'
              required
              onChange={(e) => handleValueChange('date', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='time'
              className='text-white font-medium'
            >
              Break Start Time (till next 60 minutes)
            </Label>
            <Input
              id='time'
              type='time'
              value={formData.time as string}
              className='w-full bg-gray-800 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600'
              required
              onChange={(e) => handleValueChange('time', e.target.value)}
              min='15:00'
              max='23:00'
            />
          </div>
        </CardContent>

        <CardFooter className='pt-6'>
          <Button
            type='submit'
            className='w-full bg-white text-black hover:bg-gray-200 font-semibold py-2.5 cursor-pointer'
          >
            Add Time Entry
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
