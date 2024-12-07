import type { Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'
import { createThemes } from 'tw-colors'
import { themesColors } from './src/config/theme'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [typography, animate, createThemes(themesColors)],
} satisfies Config
