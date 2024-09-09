'use client'

import { useEffect, useState } from 'react'
import { fetchPassengers, Passenger } from '@/api/fetchPassengers'
import Starship from '@/Components/Starship'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const STARSHIP_CAPACITY = 7

const StarshipAssign = () => {
  const [passengers, setPassengers] = useState<Passenger[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [assignedPassengers, setAssignedPassengers] = useState<(Passenger | null)[]>(() => {
    const savedAssignments = localStorage.getItem('assignedPassengers')
    return savedAssignments ? JSON.parse(savedAssignments) : []
  })
  const [passengerLimit, setPassengerLimit] = useState<number>(10)

  useEffect(() => {
    const savedPassengerData = localStorage.getItem('passengerData')
    if (savedPassengerData) {
      setPassengers(JSON.parse(savedPassengerData))
      setLoading(false)
    } else {
      const loadPassengers = async () => {
        setLoading(true)
        setError(null)
        try {
          const data = await fetchPassengers(passengerLimit)
          if (data) {
            localStorage.setItem('passengerData', JSON.stringify(data))
            if (!localStorage.getItem('assignedPassengers')) {
              const newAssignments = new Array(Math.ceil(data.length / STARSHIP_CAPACITY) * STARSHIP_CAPACITY).fill(
                null
              )
              setAssignedPassengers(newAssignments)
              localStorage.setItem('assignedPassengers', JSON.stringify(newAssignments))
            }

            setPassengers(data)
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
    }
  }, [passengerLimit])

  const getAssignedCountForStarship = (starshipIndex: number) => {
    const startIndex = starshipIndex * STARSHIP_CAPACITY
    const endIndex = startIndex + STARSHIP_CAPACITY
    const starshipPassengers = assignedPassengers.slice(startIndex, endIndex)
    return starshipPassengers.filter(passenger => passenger !== null).length
  }

  const handleAssignPassenger = (selectedPassenger: Passenger, index: number) => {
    const starshipIndex = Math.floor(index / STARSHIP_CAPACITY)
    if (starshipIndex > 0) {
      const passengersInPreviousStarship = getAssignedCountForStarship(starshipIndex - 1)
      if (passengersInPreviousStarship < STARSHIP_CAPACITY) {
        toast.error(
          `You cannot assign passengers to Starship ${starshipIndex + 1} before Starship ${starshipIndex} is full.`
        )
        return
      }
    }

    const passengersInCurrentStarship = getAssignedCountForStarship(starshipIndex)
    if (passengersInCurrentStarship < STARSHIP_CAPACITY) {
      setAssignedPassengers(prevAssignments => {
        const nextAssignment = [...prevAssignments]
        nextAssignment[index] = selectedPassenger
        localStorage.setItem('assignedPassengers', JSON.stringify(nextAssignment))
        return nextAssignment
      })
    }
  }

  const handleRemovePassenger = (index: number) => {
    setAssignedPassengers(prevAssignments => {
      const nextAssignment = [...prevAssignments]
      nextAssignment[index] = null
      localStorage.setItem('assignedPassengers', JSON.stringify(nextAssignment))
      return nextAssignment
    })
  }

  const unassignedPassengers =
    passengers?.filter(
      p => !assignedPassengers.includes(p) && !assignedPassengers.find(ap => ap?.id === p.id && ap?.checkedIn)
    ) || []
  const totalStarships = passengers ? Math.ceil(passengers.length / STARSHIP_CAPACITY) : 0
  const passengersLeftToAssign = unassignedPassengers.length

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return <p className='text-center text-red-500'>{error}</p>
  }

  return (
    <div className='min-h-screen p-6 text-primary'>
      <ToastContainer />
      <h1 className='mb-10 text-center text-4xl font-bold'>Starship Passenger Assignment</h1>
      <p className='mb-4 text-center text-xl'>Please assign the required passengers to the correct starship</p>
      <p className='mb-6 text-center text-xl'>{passengersLeftToAssign} passengers left to assign</p>
      {!localStorage.getItem('passengerData') && (
        <div className='mb-6 flex justify-center'>
          <label
            htmlFor='passenger-limit'
            className='mr-4 text-lg font-medium'
          >
            Select number of passengers:
          </label>
          <select
            id='passenger-limit'
            className='rounded-lg border border-gray-300 p-2'
            value={passengerLimit}
            onChange={event => setPassengerLimit(Number(event.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}
      <div className='flex flex-col items-center space-y-12'>
        {Array.from({ length: totalStarships }).map((_, starshipIndex) => (
          <Starship
            key={starshipIndex}
            starshipIndex={starshipIndex}
            passengers={assignedPassengers}
            onAssignPassenger={handleAssignPassenger}
            onRemovePassenger={handleRemovePassenger}
            unassignedPassengers={unassignedPassengers}
          />
        ))}
      </div>
    </div>
  )
}

export default StarshipAssign
