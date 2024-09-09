'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Navbar, Collapse, IconButton } from '@material-tailwind/react'
import { Assign, Passengers, Checkin, BurgerMenu, Cross, Home } from '@/icons/navBarIcons'
import { useRouter } from 'next/navigation'

const narbarItems = [
  {
    icon: Home,
    title: 'Home',
    description: 'Home page',
    page: '/',
    id: 'home_nav'
  },
  {
    icon: Passengers,
    title: 'View Passengers',
    description: 'Check all passengers aboard',
    page: '/view-passengers',
    id: 'passengers_nav'
  },
  {
    icon: Assign,
    title: 'Assign Passengers',
    description: 'Assign passengers to their seats',
    page: '/assign-passengers',
    id: 'assign_nav'
  },
  {
    icon: Checkin,
    title: 'Starship View and Check-in',
    description: 'Manage starship and check-in',
    page: '/view-checkin',
    id: 'checkin_nav'
  }
]

export function NavbarDefault() {
  const [openNav, setOpenNav] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navList = (
    <ul className='mb-4 ml-auto mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      {narbarItems.map(({ icon, title, page, id }, key) => (
        <li
          id={id}
          key={key}
          className='flex items-center gap-x-2 p-1 text-lg font-medium text-primary transition duration-200 hover:scale-105 hover:text-secondary'
        >
          {React.createElement(icon, {
            className: 'h-5 w-5 text-primary transition duration-200 hover:text-secondary hover:scale-105'
          })}
          <button
            onClick={() => router.push(page)}
            className='flex items-center'
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <Navbar
      id='navbar'
      className='mx-auto max-w-full bg-gray-200 px-4 py-2 text-primary lg:px-2 lg:py-4'
      style={{ border: 'none', boxShadow: 'none' }}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <Image
          id='navbar_logo'
          src='/logo/Hyperspace.svg'
          className='mr-10'
          width={250}
          height={100}
          alt='Hyperspace'
        />
        <div className='hidden lg:block'>{navList}</div>
        {/* Mobile view */}
        <IconButton
          id='burger_menu'
          variant='text'
          className='ml-auto h-6 w-6 text-primary lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <Cross
              id='cross_icon'
              className='h-6 w-6'
            />
          ) : (
            <BurgerMenu
              id='burgerMenu_Icon'
              className='h-6 w-6'
            />
          )}
        </IconButton>
      </div>

      {/* Mobile Collapse Menu */}
      {openNav && (
        <Collapse
          className='justify-end'
          open={openNav}
        >
          {navList}
        </Collapse>
      )}
    </Navbar>
  )
}
