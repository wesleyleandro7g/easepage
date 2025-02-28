export function HeaderSection() {
  return (
    <header>
      <nav className='w-full z-50'>
        <div className='flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div>
            <a href='#' className='text-2xl font-bold text-gray-900'>
              Easepage
            </a>
          </div>
          <div>
            <ul>
              <li className='inline-block mr-4'>
                <a href='#' className='text-gray-900'>
                  Home
                </a>
              </li>
              <li className='inline-block mr-4'>
                <a href='#' className='text-gray-900'>
                  Features
                </a>
              </li>
              <li className='inline-block mr-4'>
                <a href='#' className='text-gray-900'>
                  Pricing
                </a>
              </li>
              <li className='inline-block mr-4'>
                <a href='#' className='text-gray-900'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <button className='px-8 py-3 bg-black text-white rounded-xl'>
              Comprar agora
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
