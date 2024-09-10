import { error } from 'console'

export interface Passenger {
  id: any
  firstname: string
  lastname: string
  email: string
  phone: string
  image: string
  checkedIn: boolean
}

export async function fetchPassengers(quantity: number): Promise<Passenger[] | null> {
  try {
    const response = await fetch(`https://fakerapi.it/api/v2/persons?_quantity=${quantity}`)
    const data = await response.json()

    if (response.ok) {
      return data.data
    } else {
      console.error('Failed to passenger data')
      return null
    }
  } catch (message) {
    console.error('An error occurred while fetching data:', message)
    return null
  }
}
