'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Navbar, Collapse, IconButton } from '@material-tailwind/react'
import {
  Assign,
  Passengers,
  Checkin,
  BurgerMenu,
  Cross,
  Home,
} from '@/icons/navBarIcons'
import { useRouter } from 'next/navigation'

const narbarItems = [
  {
    icon: Home,
    title: 'Home',
    description: 'Home page',
    page: '/',
    id: 'home_nav',
  },
  {
    icon: Passengers,
    title: 'View Passengers',
    description: 'Check all passengers aboard',
    page: '/view-passengers',
    id: 'passengers_nav',
  },
  {
    icon: Assign,
    title: 'Assign Passengers',
    description: 'Assign passengers to their seats',
    page: '/assign-passengers',
    id: 'assign_nav',
  },
  {
    icon: Checkin,
    title: 'Starship View and Check-in',
    description: 'Manage starship and check-in',
    page: '/view-checkin',
    id: 'checkin_nav',
  },
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
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ml-auto">
      {narbarItems.map(({ icon, title, page, id }, key) => (
        <li
          id={id}
          key={key}
          className="flex items-center gap-x-2 p-1 font-medium transition duration-200 hover:text-secondary hover:scale-105 text-lg"
        >
          {React.createElement(icon, {
            className:
              'h-5 w-5 text-primary transition duration-200 hover:text-secondary hover:scale-105',
          })}
          <button
            onClick={() => router.push(page)}
            className="flex items-center"
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <Navbar
      id="navbar"
      className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-transparent border-none text-primary !border-0"
    >
      <div className="container mx-auto flex items-center justify-between text-primary">
        <Image
          id="navbar_logo"
          src="/logo/Hyperspace.svg"
          className="mr-10"
          width={100}
          height={30}
          alt="Hyperspace"
        />
        <div className="hidden lg:block">{navList}</div>
        {/* mobile view */}
        <IconButton
          id="burger_menu"
          variant="text"
          className="ml-auto h-6 w-6 text-primary lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <Cross id="cross_icon" className="h-6 w-6" />
          ) : (
            <BurgerMenu id="burgerMenu_Icon" className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      {/* Mobile Collapse Menu */}
      {openNav && (
        <Collapse className="justify-end" open={openNav}>
          {navList}
        </Collapse>
      )}
    </Navbar>
  )
}
