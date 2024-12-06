import { ReactNode } from 'react'
import { InputWithLabel } from '../input-label'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

interface EditPriceBtnProps {
  children: ReactNode
}

export function EditPriceBtn({ children }: EditPriceBtnProps) {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Element 02</DrawerTitle>
          <DrawerDescription>
            Informe o link de compra do seu produto
          </DrawerDescription>
        </DrawerHeader>

        <div className='px-4 space-y-4'>
          <InputWithLabel />
          <InputWithLabel />
        </div>

        <DrawerFooter>
          <Button>Salvar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
