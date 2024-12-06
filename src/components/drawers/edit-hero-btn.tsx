/* eslint-disable @typescript-eslint/no-explicit-any */
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
  DrawerClose,
} from '../ui/drawer'
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form'

interface EditHeroBtnProps {
  children: ReactNode
  form: any
}

export function EditHeroBtn({ children, form }: EditHeroBtnProps) {
  return (
    <Drawer>
      <DrawerTrigger className='text-lg px-8 py-3 rounded-full bg-black text-white hover:bg-black/90'>
        {children}
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Botão de CTA</DrawerTitle>
          <DrawerDescription>
            Use o CTA em primeira pessoa para aumentar em até 90% as chances de
            conversão.
          </DrawerDescription>
        </DrawerHeader>

        <div className='px-4 space-y-4'>
          <FormField
            control={form?.control}
            name='heroButtonText'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    label='Texto do botão:'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name='heroButtonLink'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel label='Link:' type='url' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button className='w-full'>Salvar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
