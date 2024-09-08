export interface Passenger {
  firstname: string
  lastname: string
  email: string
  phone: string
  image: string
}

export async function fetchPassengers(): Promise<Passenger[] | null> {
  try {
    const response = await fetch('https://fakerapi.it/api/v2/persons')
    const data = await response.json()

    if (response.ok) {
      return data.data
    } else {
      console.error('Failed to fetch persons data')
      return null
    }
  } catch (err) {
    console.error('An error occurred while fetching data:', err)
    return null
  }
}
