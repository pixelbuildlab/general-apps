import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Clock,
  BarChart3,
  Calendar,
  Users,
  ArrowRight,
  Timer,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Homepage() {
  const navigate = useNavigate()
  const features = [
    {
      icon: <Clock className='h-8 w-8 text-white' />,
      title: 'Time Tracking',
      description:
        'Track your work hours with precision and ease. Start, stop, and manage your time effortlessly.',
    },
    {
      icon: <BarChart3 className='h-8 w-8 text-white' />,
      title: 'Analytics',
      description:
        'Get detailed insights into your productivity patterns and time allocation across projects.',
    },
    {
      icon: <Calendar className='h-8 w-8 text-white' />,
      title: 'Schedule Management',
      description:
        'Organize your tasks and deadlines with our intuitive calendar integration.',
    },
    {
      icon: <Users className='h-8 w-8 text-white' />,
      title: 'Team Collaboration',
      description:
        'Work together with your team and track collective progress on shared projects.',
    },
  ]

  return (
    <div className='min-h-screen bg-black'>
      {/* Navigation */}
      <nav className='border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Timer className='h-8 w-8 text-white' />
              <span className='text-xl font-bold text-white'>TimeTracker</span>
            </div>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                className='text-gray-300 hover:text-white hover:bg-gray-800'
              >
                Features
              </Button>
              <Button
                variant='ghost'
                className='text-gray-300 hover:text-white hover:bg-gray-800'
              >
                About
              </Button>
              <Button
                className='bg-white text-black hover:bg-gray-200'
                onClick={() => navigate('/teams-clockify')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='py-20 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-white mb-6 leading-tight'>
            Track Your Time,
            <br />
            <span className='text-gray-400'>Boost Your Productivity</span>
          </h1>
          <p className='text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed'>
            Take control of your work hours with our intuitive time tracking
            solution. Monitor progress, analyze patterns, and optimize your
            workflow.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => navigate('/teams-clockify')}
              className='bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3'
            >
              Start Tracking Now
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-gray-600 text-black hover:text-white hover:bg-gray-800 px-8 py-3'
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Everything You Need
            </h2>
            <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
              Powerful features designed to help you manage time effectively and
              boost your productivity.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-colors'
              >
                <CardHeader className='text-center pb-4'>
                  <div className='mx-auto mb-4 p-3 bg-gray-800 rounded-lg w-fit'>
                    {feature.icon}
                  </div>
                  <CardTitle className='text-white text-lg'>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-gray-400 text-center leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <Card className='border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl'>
            <CardHeader className='text-center pb-6'>
              <CardTitle className='text-3xl font-bold text-white mb-4'>
                Ready to Get Started?
              </CardTitle>
              <CardDescription className='text-gray-400 text-lg'>
                Join thousands of professionals who trust our platform to manage
                their time effectively.
              </CardDescription>
            </CardHeader>
            <CardContent className='text-center'>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button
                  size='lg'
                  className='bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3'
                >
                  Create Free Account
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-gray-600 text-black hover:text-white hover:bg-gray-800 px-8 py-3'
                >
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-800 py-8 px-4'>
        <div className='max-w-6xl mx-auto text-center'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <Timer className='h-6 w-6 text-white' />
            <span className='text-lg font-semibold text-white'>
              TimeTracker
            </span>
          </div>
          <p className='text-gray-400 text-sm'>
            © 2025 TimeTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
