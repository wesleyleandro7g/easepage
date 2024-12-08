import { ArrowLeft, ArrowRight, Home, RotateCcw, X } from 'lucide-react'

export default function BrowserWindow() {
  return (
    <div className='max-w-3xl mx-auto p-4'>
      <div className='rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
        {/* Window Header */}
        <div className='bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-200'>
          {/* Window Controls */}
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-red-500' />
            <div className='w-3 h-3 rounded-full bg-yellow-500' />
            <div className='w-3 h-3 rounded-full bg-green-500' />
          </div>

          {/* Window Title */}
          <div className='absolute left-1/2 transform -translate-x-1/2'>
            <h1 className='text-sm font-medium'>Ease Page</h1>
          </div>

          {/* Close Button */}
          <button className='hover:bg-gray-200 p-1 rounded-sm'>
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Navigation Bar */}
        <div className='bg-white px-4 py-2 flex items-center gap-4 border-b border-gray-200'>
          <div className='flex items-center gap-2'>
            <button className='hover:bg-gray-100 p-1.5 rounded-sm'>
              <ArrowLeft className='w-4 h-4 text-gray-600' />
            </button>
            <button className='hover:bg-gray-100 p-1.5 rounded-sm'>
              <ArrowRight className='w-4 h-4 text-gray-600' />
            </button>
            <button className='hover:bg-gray-100 p-1.5 rounded-sm'>
              <RotateCcw className='w-4 h-4 text-gray-600' />
            </button>
            <button className='hover:bg-gray-100 p-1.5 rounded-sm'>
              <Home className='w-4 h-4 text-gray-600' />
            </button>
          </div>

          {/* Address Bar */}
          <div className='flex-1'>
            <div className='bg-gray-100 rounded px-3 py-1.5'>
              <div className='w-full h-4 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className='h-64 bg-white' />
      </div>
    </div>
  )
}
