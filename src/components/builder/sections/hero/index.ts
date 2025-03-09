import { HeroDefault as Default } from './hero-default'
import { HeroCentered as Centered } from './hero-centered'

import { HeroDefaultBuild } from './hero-default/build'
import { HeroCenteredBuild } from './hero-centered/build'

const HeroVariants = { Default, Centered }
const HeroBuildVariants = {
  Default: HeroDefaultBuild,
  Centered: HeroCenteredBuild,
}

export { HeroVariants, HeroBuildVariants }
