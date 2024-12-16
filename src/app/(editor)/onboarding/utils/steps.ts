import { Step01 } from '../components/form/step01'
import { Step02 } from '../components/form/step02'
import { Step03 } from '../components/form/step03'
import { Step04 } from '../components/form/step04'
import { Step05 } from '../components/form/step05'

export type StepType = 'step-1' | 'step-2' | 'step-3' | 'step-4' | 'step-5'

export const steps: Record<StepType, React.ElementType> = {
  'step-1': Step01,
  'step-2': Step02,
  'step-3': Step03,
  'step-4': Step04,
  'step-5': Step05,
}
