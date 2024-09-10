import { render, fireEvent, screen } from '@testing-library/react'
import PassengerCard from '../PassengerCard'
import { Passenger } from '@/api/fetchPassengers'

describe('PassengerCard Component', () => {
  const mockOnAssign = jest.fn()
  const mockOnRemove = jest.fn()
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

  it('renders the passenger component with passengers and assign buttons', () => {
    const passenger = {
      id: undefined,
      email: 'johnloves@beer.com',
      firstname: 'John',
      lastname: 'Smith',
      phone: '+123456789',
      image: '',
      checkedIn: false
    }

    render(
      <PassengerCard
        passenger={passenger}
        onAssign={mockOnAssign}
        onRemove={mockOnRemove}
        isAssigned={false}
        unassignedPassengers={unassignedPassengers}
      />
    )
    expect(document.getElementById('passenger_card')).toBeInTheDocument
    expect(document.getElementById('passenger_card_intials')).toBeInTheDocument
    expect(document.getElementById('passenger_card_firstname')).toBeInTheDocument
    expect(document.getElementById('passenger_card_assign_button')).toBeInTheDocument
  })

  it('should allow selecting a passenger from dropdown and click assign', () => {
    render(
      <PassengerCard
        passenger={null}
        onAssign={mockOnAssign}
        onRemove={mockOnRemove}
        isAssigned={false}
        unassignedPassengers={unassignedPassengers}
      />
    )

    fireEvent.click(screen.getByText('Assign'))
    fireEvent.click(screen.getByText('Select Passenger'))

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'John Smith' } })

    expect(document.getElementById('passenger_card_intials')).toBeInTheDocument
    expect(document.getElementById('passenger_card_remove_button')).toBeInTheDocument
  })

  it('should call onRemove when remove button is clicked', () => {
    const passenger = {
      id: undefined,
      email: 'johnloves@beer.com',
      firstname: 'John',
      lastname: 'Smith',
      phone: '+123456789',
      image: '',
      checkedIn: false
    }

    render(
      <PassengerCard
        passenger={passenger}
        onAssign={mockOnAssign}
        onRemove={mockOnRemove}
        isAssigned={true}
        unassignedPassengers={unassignedPassengers}
      />
    )

    fireEvent.click(screen.getByText('Remove'))

    expect(mockOnRemove).toHaveBeenCalled()
  })
})
