import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { NavbarDefault } from '../NavBar'
import React from 'react'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    }
  }
}))

beforeAll(() => {
  window.scrollTo = jest.fn()
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query.includes(`max-width: ${window.innerWidth}px`),
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  })
})

const resizeWindow = (width: number) => {
  act(() => {
    window.innerWidth = width
    window.dispatchEvent(new Event('resize'))
  })
}

describe('NavbarDefault Component', () => {
  it('renders the navbar with logo', () => {
    render(<NavbarDefault />)
    expect(document.getElementById('navbar')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<NavbarDefault />)
    expect(document.getElementById('navbar')).toBeInTheDocument()
    expect(document.getElementById('passengers_nav')).toBeInTheDocument()
    expect(document.getElementById('assign_nav')).toBeInTheDocument()
    expect(document.getElementById('checkin_nav')).toBeInTheDocument()
  })

  it('displays burger menu icon and opens mobile menu when clicked on screen size below 960px', async () => {
    render(<NavbarDefault />)

    // Resize to below 960px
    resizeWindow(600)

    // Wait for the burger menu icon to be visible
    await waitFor(() => {
      expect(document.getElementById('burgerMenu_Icon')).toBeInTheDocument()
    })

    // lets click the burger
    fireEvent.click(document.getElementById('burger_menu')!)

    // Wait for the menu items
    await waitFor(() => {
      expect(document.getElementById('passengers_nav')).toBeInTheDocument()
      expect(document.getElementById('assign_nav')).toBeInTheDocument()
      expect(document.getElementById('checkin_nav')).toBeInTheDocument()
    })
  })

  it('closes mobile menu when window is resized to >= 960px', async () => {
    render(<NavbarDefault />)

    // Spy on React.useState to capture state updates
    const setOpenNavSpy = jest.spyOn(React, 'useState')

    resizeWindow(600)

    await waitFor(() => {
      expect(document.getElementById('burgerMenu_Icon')).toBeInTheDocument()
    })

    fireEvent.click(document.getElementById('burger_menu')!)

    resizeWindow(1080)

    expect(setOpenNavSpy).toHaveBeenCalledWith(false)
  })
})
