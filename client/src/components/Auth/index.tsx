'use client'

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
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <Card className='border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold text-white'>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className='text-gray-400'>
              {isLogin
                ? 'Sign in to your account to continue'
                : 'Sign up to get started with time tracking'}
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent className='space-y-4 pb-2'>
              {!isLogin && (
                <div className='space-y-2'>
                  <Label
                    htmlFor='name'
                    className='text-white font-medium'
                  >
                    Full Name
                  </Label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                    <Input
                      id='name'
                      type='text'
                      placeholder='Enter your full name'
                      className='w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
                      required
                    />
                  </div>
                </div>
              )}

              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-white font-medium'
                >
                  Email
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    className='w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-white font-medium'
                >
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    className='w-full pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className='space-y-2'>
                  <Label
                    htmlFor='confirmPassword'
                    className='text-white font-medium'
                  >
                    Confirm Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                    <Input
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm your password'
                      className='w-full pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600'
                      required
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <input
                      id='remember'
                      type='checkbox'
                      className='w-4 h-4 text-white bg-gray-800 border-gray-700 rounded focus:ring-gray-600'
                    />
                    <Label
                      htmlFor='remember'
                      className='text-sm text-gray-400'
                    >
                      Remember me
                    </Label>
                  </div>
                  <button
                    type='button'
                    className='text-sm text-gray-400 hover:text-white transition-colors'
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </CardContent>

            <CardFooter className='pt-6 justify-center items-center gap-1.5'>
              <Button
                type='submit'
                className='flex-1  bg-white text-black hover:bg-gray-200 font-semibold py-2.5'
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>

              <div className='text-center'>
                <span className='text-gray-400 text-sm'>
                  {isLogin
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                </span>
                <button
                  type='button'
                  onClick={() => setIsLogin(!isLogin)}
                  className='text-white text-sm font-medium hover:underline cursor-pointer'
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
