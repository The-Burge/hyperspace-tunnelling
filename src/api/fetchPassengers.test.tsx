import { fetchPassengers, Passenger } from './fetchPassengers'

global.fetch = jest.fn()

describe('fetchPassengers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return passengers data when API call is successful', async () => {
    const mockPassengers: Passenger[] = [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
        image: 'https://example.com/image1.jpg',
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        phone: '987654321',
        image: 'https://example.com/image2.jpg',
      },
    ]

    // Mock fetch to resolve successfully
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPassengers }),
    })

    const result = await fetchPassengers()
    expect(result).toEqual(mockPassengers)
  })

  it('should return null when API call fails', async () => {
    // Mock fetch to return a failure response
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    })

    const result = await fetchPassengers()
    expect(result).toBeNull()
  })

  it('should return null when an error occurs during the API call', async () => {
    // Mock fetch to reject with an error
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('API error'))

    const result = await fetchPassengers()
    expect(result).toBeNull()
  })
})
