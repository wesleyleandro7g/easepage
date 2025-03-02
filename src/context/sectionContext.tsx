import { SectionOptionType } from '@/components/builder/utils/section-options'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface SectionContextProps {
  sections: SectionOptionType[]
  setSections: Dispatch<SetStateAction<SectionOptionType[]>>
}

const SectionContext = createContext<SectionContextProps | undefined>(undefined)

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<SectionOptionType[]>([])

  return (
    <SectionContext.Provider value={{ sections, setSections }}>
      {children}
    </SectionContext.Provider>
  )
}

export const useSectionContent = () => {
  const context = useContext(SectionContext)
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider')
  }
  return context
}
