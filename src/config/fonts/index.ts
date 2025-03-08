import {
  Inter,
  Poppins,
  Montserrat,
  Roboto,
  Prompt,
  Open_Sans,
  Lato,
  Nunito,
  Source_Sans_3,
  Raleway,
  Ubuntu,
  Merriweather,
  Playfair_Display,
  Lora,
  Tinos,
  EB_Garamond,
  Oswald,
  Bebas_Neue,
  Pacifico,
  Anton,
  Caveat,
} from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
})

const prompt = Prompt({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '700', '900'],
})

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '600', '700', '800'],
})

const source_sans_3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '600', '700', '800'],
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
})

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
})

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const tinos = Tinos({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
})

const eb_garamond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
})

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

const anton = Anton({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

export const fonts = [
  {
    name: 'Roboto',
    font: roboto,
  },
  {
    name: 'Open Sans',
    font: open_sans,
  },
  {
    name: 'Lato',
    font: lato,
  },

  {
    name: 'Inter',
    font: inter,
  },
  {
    name: 'Montserrat',
    font: montserrat,
  },
  {
    name: 'Poppins',
    font: poppins,
  },
  {
    name: 'Prompt',
    font: prompt,
  },
  {
    name: 'Nunito',
    font: nunito,
  },
  {
    name: 'Source Sans 3',
    font: source_sans_3,
  },
  {
    name: 'Raleway',
    font: raleway,
  },
  {
    name: 'Ubuntu',
    font: ubuntu,
  },
  {
    name: 'Merriweather',
    font: merriweather,
  },
  {
    name: 'Playfair Display',
    font: playfair_display,
  },
  {
    name: 'Lora',
    font: lora,
  },
  {
    name: 'Tinos',
    font: tinos,
  },
  {
    name: 'EB Garamond',
    font: eb_garamond,
  },
  {
    name: 'Oswald',
    font: oswald,
  },
  {
    name: 'Bebas Neue',
    font: bebas_neue,
  },
  {
    name: 'Pacifico',
    font: pacifico,
  },
  {
    name: 'Anton',
    font: anton,
  },
  {
    name: 'Caveat',
    font: caveat,
  },
]
