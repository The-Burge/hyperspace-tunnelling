import React from 'react'
import PassengerCard from './PassengerCard'
import { Passenger } from '@/api/fetchPassengers'

type StarshipProps = {
  starshipIndex: number
  passengers: (Passenger | null)[]
  onAssignPassenger: (selectedPassenger: Passenger, index: number) => void
  onRemovePassenger: (index: number) => void
  unassignedPassengers: Passenger[]
}

const Starship: React.FC<StarshipProps> = ({
  starshipIndex,
  passengers,
  onAssignPassenger,
  onRemovePassenger,
  unassignedPassengers
}) => {
  const passengerCapacity = 7

  return (
    <div
      id='starship'
      className='flex flex-col items-center space-y-4'
    >
      <h2 className='mb-4 text-center text-2xl font-bold text-black'>Starship {starshipIndex + 1}</h2>
      <div className='relative mx-auto flex w-full max-w-3xl items-center rounded-3xl bg-gray-200 p-8 shadow-2xl'>
        <div className='grid grid-flow-col justify-center gap-4'>
          {Array.from({ length: passengerCapacity }).map((_, seatIndex) => {
            const assignedIndex = starshipIndex * passengerCapacity + seatIndex
            const assignedPassenger = passengers[assignedIndex]

            return (
              <PassengerCard
                key={seatIndex}
                passenger={assignedPassenger}
                isAssigned={!!assignedPassenger}
                onAssign={selectedPassenger => onAssignPassenger(selectedPassenger, assignedIndex)}
                onRemove={() => onRemovePassenger(assignedIndex)}
                unassignedPassengers={unassignedPassengers}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Starship
