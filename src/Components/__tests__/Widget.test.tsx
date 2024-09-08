import { render, screen } from '@testing-library/react'

import PassengerCard from '../UserCard'

describe('PassengerCard', () => {
  const mockProps = {
    image: '/images/profile.jpg',
    firstname: 'Dave',
    lastname: 'Smith',
    email: 'daveloves@beer.com',
    phone: '0123456789',
  }
  it('renders passenger card', () => {
    render(<PassengerCard {...mockProps} />)
    expect(document.getElementById('passenger_card')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<PassengerCard {...mockProps} />)
    expect(document.getElementById('passenger_card')).toBeInTheDocument()
    expect(screen.getByText('0123456789')).toBeInTheDocument()
    expect(screen.getByText('Dave Smith')).toBeInTheDocument()
    expect(screen.getByText('daveloves@beer.com')).toBeInTheDocument()
  })
})
