import { fetchPassengers, Passenger } from './fetchPassengers'

global.fetch = jest.fn()
global.console.error = jest.fn()

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
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPassengers }),
    })

    const result = await fetchPassengers(2)
    expect(result).toEqual(mockPassengers)
  })

  it('should return null when API call fails', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    })

    const result = await fetchPassengers(2)
    expect(result).toBeNull()
    expect(console.error).toHaveBeenCalledWith('Failed to passenger data')
  })

  it('should return null when an error occurs during the API call', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('API error'))

    const result = await fetchPassengers(2)
    expect(result).toBeNull()
    expect(console.error).toHaveBeenCalledWith(
      'An error occurred while fetching data:',
      expect.any(Error)
    )
  })
})
