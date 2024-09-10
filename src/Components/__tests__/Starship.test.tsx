import { render, fireEvent, screen } from '@testing-library/react'
import Starship from '../Starship'
import { Passenger } from '@/api/fetchPassengers'

describe('PassengerCard Component', () => {
  const mockOnAssign = jest.fn()
  const mockOnRemove = jest.fn()
  const passengers: (Passenger | null)[] = [
    {
      id: 1,
      email: 'johnloves@beer.com',
      firstname: 'John',
      lastname: 'Smith',
      phone: '+123456789',
      image: '/image',
      checkedIn: false
    },
    {
      id: 2,
      email: 'jane@example.com',
      firstname: 'Jane',
      lastname: 'Smith',
      phone: '+123456789',
      image: '/image',
      checkedIn: false
    },
    null,
    null,
    null,
    null,
    null
  ]
  const unassignedPassengers: Passenger[] = [
    {
      id: undefined,
      email: 'johnloves@beer.com',
      firstname: 'John',
      lastname: 'Smith',
      phone: '+123456789',
      image: '',
      checkedIn: false
    },
    {
      email: 'jane@example.com',
      firstname: 'Jane',
      lastname: 'Smith',
      id: undefined,
      phone: '',
      image: '',
      checkedIn: false
    }
  ]

  it('renders the correct starship based on the index', () => {
    render(
      <Starship
        starshipIndex={2}
        passengers={passengers}
        onAssignPassenger={mockOnAssign}
        onRemovePassenger={mockOnRemove}
        unassignedPassengers={unassignedPassengers}
      />
    )

    expect(document.getElementById('starship_2')).toBeInTheDocument()
  })

  it('should render the correct number of passenger seats per starship', () => {
    render(
      <Starship
        starshipIndex={0}
        passengers={passengers}
        onAssignPassenger={mockOnAssign}
        onRemovePassenger={mockOnRemove}
        unassignedPassengers={unassignedPassengers}
      />
    )
    expect(document.getElementById('starship_seat_0')).toBeInTheDocument
    expect(document.getElementById('starship_seat_1')).toBeInTheDocument
    expect(document.getElementById('starship_seat_2')).toBeInTheDocument
    expect(document.getElementById('starship_seat_3')).toBeInTheDocument
    expect(document.getElementById('starship_seat_4')).toBeInTheDocument
    expect(document.getElementById('starship_seat_5')).toBeInTheDocument
    expect(document.getElementById('starship_seat_6')).toBeInTheDocument
  })

  it('should call onRemovePassenger when a passenger is removed from a seat', () => {
    render(
      <Starship
        starshipIndex={0}
        passengers={passengers}
        onAssignPassenger={mockOnAssign}
        onRemovePassenger={mockOnRemove}
        unassignedPassengers={unassignedPassengers}
      />
    )

    // Simulate removing a passenger from the first seat
    fireEvent.click(screen.getAllByText('Remove')[0])

    expect(mockOnRemove).toHaveBeenCalledWith(0)
  })
})
