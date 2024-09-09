'use client'

import { useEffect, useState } from 'react'
import { fetchPassengers, Passenger } from '@/api/fetchPassengers'
import PassengerCard from '@/Components/UserCard'

const StarshipPassengers = () => {
  const [passengers, setPassengers] = useState<Passenger[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [passengerLimit, setPassengerLimit] = useState<number>(10)

  useEffect(() => {
    const loadPassengers = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchPassengers(passengerLimit)

        if (data) {
          localStorage.removeItem('assignedPassengers')
          localStorage.removeItem('passengerData')
          setPassengers(data)
          localStorage.setItem('passengerData', JSON.stringify(data))
        } else {
          setError('No passengers found.')
        }
      } catch (err) {
        setError('Failed to load passengers.')
      } finally {
        setLoading(false)
      }
    }

    loadPassengers()
  }, [passengerLimit])

  const handlePassengerLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPassengerLimit(Number(event.target.value))
  }

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-black'>Loading...</p>
      </div>
    )
  }

  if (error) {
    return <p className='text-red-500'>{error}</p>
  }

  return (
    <div className='min-h-screen p-6'>
      <h1 className='mb-6 text-center text-2xl font-bold text-primary'>Passenger List</h1>

      {/* Dropdown to select number of passengers */}
      <div className='mb-6 flex justify-center'>
        <label
          htmlFor='passenger-limit'
          className='mr-4 text-lg font-medium text-primary'
        >
          Select number of passengers:
        </label>
        <select
          id='passenger-limit'
          className='rounded-lg border border-primary p-2 text-primary'
          value={passengerLimit}
          onChange={handlePassengerLimitChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {passengers && passengers.length > 0 ? (
        <ul className='grid grid-cols-1 gap-10 px-40 sm:grid-cols-2 lg:grid-cols-4'>
          {passengers.map((passenger, index) => (
            <li
              key={index}
              className='transition-transform hover:scale-105'
            >
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
        <p className='text-gray-500'>No passengers available.</p>
      )}
    </div>
  )
}

export default StarshipPassengers
