'use client'

import { useEffect, useState } from 'react'
import { fetchPassengers, Passenger } from '@/api/fetchPassengers'
import PassengerCard from '@/Components/UserCard'

const PassengerList = () => {
  const [passengers, setPassengers] = useState<Passenger[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPassengers = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchPassengers()
        setPassengers(data)
      } catch (err) {
        setError('Failed to load passengers.')
      } finally {
        setLoading(false)
      }
    }

    loadPassengers()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Passenger List</h1>
      {passengers && passengers.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-20">
          {passengers.map((passenger, index) => (
            <li key={index} className="transition-transform hover:scale-105">
              <PassengerCard
                image={`https://robohash.org/${passenger.firstname}`}
                firstname={passenger.firstname}
                lastname={passenger.lastname}
                email={passenger.email}
                phone={passenger.phone}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No passengers available.</p>
      )}
    </div>
  )
}

export default PassengerList
