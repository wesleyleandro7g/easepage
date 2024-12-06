import { cn } from '@/lib/utils'

interface CustomAlertProps {
  children?: React.ReactNode
}

export function CustomAlert({ children }: CustomAlertProps) {
  if (!children) {
    return null
  }

  return (
    <div className='relative bg-red-200 p-4 rounded-lg shadow-lg flex flex-col items-center gap-2'>
      <p className={cn('text-[0.8rem] font-medium text-red-500 text-center')}>
        {children}
      </p>
      <div className='absolute bottom-[-7px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-red-200 rounded-t-sm'></div>
    </div>
  )
}
