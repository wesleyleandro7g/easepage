import { cn } from '@/lib/utils'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface InputWithLabelProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  wrapperClassName?: string
}

export function InputTextArea(props: InputWithLabelProps) {
  const { label, wrapperClassName, ...rest } = props

  return (
    <div
      className={cn(
        'grid w-full max-w-sm items-center gap-1.5',
        wrapperClassName
      )}
    >
      <Label htmlFor={props.name}>{label}</Label>
      <Textarea {...rest} />
    </div>
  )
}
