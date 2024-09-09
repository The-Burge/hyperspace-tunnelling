import { render, screen, waitFor } from '@testing-library/react'
import PassengerList from './page'
import { fetchPassengers } from '@/api/fetchPassengers'

jest.mock('@/api/fetchPassengers')

describe('PassengerList Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should display loading message while passengers are being fetched', () => {
    ;(fetchPassengers as jest.Mock).mockImplementation(() => new Promise(() => {}))

    render(<PassengerList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display error message when fetching passengers fails', async () => {
    ;(fetchPassengers as jest.Mock).mockRejectedValue(new Error('Failed to load passengers.'))

    render(<PassengerList />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load passengers.')).toBeInTheDocument()
    })
  })

  it('should display passenger data when fetching passengers is successful', async () => {
    const mockPassengers = [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        image: '/images/profile.jpg'
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        phone: '098-765-4321',
        image: '/images/profile2.jpg'
      }
    ]

    // Mock fetchPassengers to resolve with mock passenger data
    ;(fetchPassengers as jest.Mock).mockResolvedValue(mockPassengers)

    render(<PassengerList />)

    // Wait for passenger data to be rendered
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })
  })

  it('should display "No passengers available." if the passenger list is empty', async () => {
    // Mock fetchPassengers to resolve with an empty array
    ;(fetchPassengers as jest.Mock).mockResolvedValue([])

    render(<PassengerList />)

    // Wait for the empty state message to appear
    await waitFor(() => {
      expect(screen.getByText('No passengers available.')).toBeInTheDocument()
    })
  })
})
