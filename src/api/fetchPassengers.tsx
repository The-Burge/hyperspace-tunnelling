export interface Passenger {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  image: string
  checkedIn: boolean
}

export async function fetchPassengers(limit: number): Promise<Passenger[] | null> {
  try {
    const response = await fetch(`https://fakerapi.it/api/v2/persons?_quantity=${limit}`)
    const data = await response.json()

    if (response.ok) {
      return data.data
    } else {
      console.error('Failed to passenger data')
      return null
    }
  } catch (err) {
    console.error('An error occurred while fetching data:', err)
    return null
  }
}
