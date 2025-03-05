import { PageDataType } from '@/types/page'
import { SectionOptionType } from '@/types/section'
import { UserDataType } from '@/types/user'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface PageContextProps {
  userData: UserDataType
  setUserData: Dispatch<SetStateAction<UserDataType>>
  pageData: PageDataType
  setPageData: Dispatch<SetStateAction<PageDataType>>
  sections: SectionOptionType[]
  setSections: Dispatch<SetStateAction<SectionOptionType[]>>
}

const PageContext = createContext<PageContextProps | undefined>(undefined)

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType)
  const [pageData, setPageData] = useState<PageDataType>({} as PageDataType)
  const [sections, setSections] = useState<SectionOptionType[]>([])

  const value = {
    pageData,
    setPageData,
    sections,
    setSections,
    userData,
    setUserData,
  }

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export const usePageContent = () => {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider')
  }
  return context
}
