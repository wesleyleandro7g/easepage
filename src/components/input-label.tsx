import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function InputWithLabel(props: InputWithLabelProps) {
  const { label, ...rest } = props

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='email'>{label}</Label>
      <Input {...rest} />
    </div>
  )
}
