import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  wrapperClassName?: string
}

export function InputWithLabel(props: InputWithLabelProps) {
  const { label, wrapperClassName, ...rest } = props

  return (
    <div
      className={cn(
        'grid w-full max-w-sm items-center gap-1.5',
        wrapperClassName
      )}
    >
      <Label htmlFor={props.name}>{label}</Label>
      <Input {...rest} />
    </div>
  )
}
