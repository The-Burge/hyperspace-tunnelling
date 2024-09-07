import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { NavbarDefault } from '../NavBar'

beforeAll(() => {
  window.scrollTo = jest.fn()
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: query.includes(`max-width: ${window.innerWidth}px`),
      addListener: jest.fn(),
      removeListener: jest.fn(),
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
    const { getByRole } = render(<NavbarDefault />)

    // Resize to below 960px
    resizeWindow(600)

    // Wait for the burger menu icon to be visible
    await waitFor(() => {
      expect(document.getElementById('burgerMenu_Icon')).toBeInTheDocument()
    })

    // Open the menu
    const burgerButton = getByRole('button')
    fireEvent.click(burgerButton)

    // Wait for the menu items
    await waitFor(() => {
      expect(document.getElementById('passengers_nav')).toBeInTheDocument()
      expect(document.getElementById('assign_nav')).toBeInTheDocument()
      expect(document.getElementById('checkin_nav')).toBeInTheDocument()
    })
  })
})
