'use client'
import { useState, useEffect } from 'react'
import { Passenger } from '@/api/fetchPassengers'
import { Widget } from '@/Components/widget'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const STARSHIP_CAPACITY = 7

const StarshipCheckIn = () => {
  const [assignedPassengers, setAssignedPassengers] = useState<(Passenger & { checkedIn: boolean })[]>(() => {
    const savedAssignments = localStorage.getItem('assignedPassengers')
    return savedAssignments ? JSON.parse(savedAssignments) : []
  })

  useEffect(() => {
    const savedAssignments = localStorage.getItem('assignedPassengers')
    if (savedAssignments) {
      setAssignedPassengers(JSON.parse(savedAssignments))
    }
  }, [])

  const getPassengersInStarship = (starshipIndex: number) => {
    const startIndex = starshipIndex * STARSHIP_CAPACITY
    const endIndex = startIndex + STARSHIP_CAPACITY
    const starshipPassengers = assignedPassengers.slice(startIndex, endIndex)
    return starshipPassengers
  }

  const handleCheckInPassenger = (index: number) => {
    setAssignedPassengers(prevAssignments => {
      const nextAssignments = [...prevAssignments]
      if (nextAssignments[index]) {
        nextAssignments[index] = { ...nextAssignments[index], checkedIn: true }
        toast.success(`${nextAssignments[index].firstname} ${nextAssignments[index].lastname} has been checked in!`, {
          icon: <span>👨🏻‍🚀</span>
        })
      }
      localStorage.setItem('assignedPassengers', JSON.stringify(nextAssignments))
      return nextAssignments
    })
  }

  const totalStarships = Math.ceil(assignedPassengers.length / STARSHIP_CAPACITY)

  const hasPassengers = assignedPassengers.length > 0

  return (
    <div className='min-h-screen p-6 text-primary'>
      <ToastContainer />
      <h1 className='mb-10 text-center text-4xl font-bold text-primary'>Starship Status</h1>
      <p className='mb-4 text-center text-xl text-primary'>
        View the current capacity of each starship and check in passengers
      </p>
      {!hasPassengers ? (
        <div className='flex flex-col items-center space-y-4'>
          <p className='mb-4 text-center text-lg text-red-500'>No passengers to check in!</p>
          <Widget
            items={{
              img: '/image/assign.png',
              name: 'Assign Passengers',
              page: '/assign-passengers'
            }}
          />
        </div>
      ) : (
        <div className='flex flex-col items-center space-y-12'>
          {Array.from({ length: totalStarships }).map((_, starshipIndex) => {
            const starshipPassengers = getPassengersInStarship(starshipIndex)
            const assignedCount = starshipPassengers.filter(passenger => passenger !== null).length
            const checkedInCount = starshipPassengers.filter(passenger => passenger?.checkedIn).length

            return (
              <div
                key={starshipIndex}
                className='w-full max-w-3xl rounded-lg bg-gray-100 p-6 shadow-lg'
              >
                <h2 className='mb-4 text-center text-2xl font-bold text-primary'>Starship {starshipIndex + 1}</h2>
                <p className='mb-4 text-center text-primary'>
                  {assignedCount}/{STARSHIP_CAPACITY} passengers assigned
                </p>
                <p className='mb-4 text-center text-primary'>
                  {checkedInCount}/{assignedCount} passengers checked in
                </p>

                <div className='grid grid-cols-2 gap-4'>
                  {starshipPassengers.map((passenger, index) => {
                    if (!passenger) return <div key={index}>Empty</div>
                    return (
                      <div
                        key={index}
                        className={`rounded-lg p-4 ${passenger.checkedIn ? 'bg-green-500' : 'bg-red-500'} text-white`}
                      >
                        <p>
                          {passenger.firstname} {passenger.lastname}
                        </p>
                        {passenger.checkedIn ? (
                          <p className='mt-2 font-semibold text-primary'>Checked In</p>
                        ) : (
                          <button
                            className='mt-2 rounded-lg bg-secondary p-2 text-white hover:bg-blue-600'
                            onClick={() => handleCheckInPassenger(starshipIndex * STARSHIP_CAPACITY + index)}
                          >
                            Check In
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StarshipCheckIn
