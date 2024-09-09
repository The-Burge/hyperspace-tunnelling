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
  unassignedPassengers,
}) => {
  const passengerCapacity = 7

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">
        Starship {starshipIndex + 1}
      </h2>
      <div className="relative flex items-center bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto">
        <div className="grid grid-flow-col gap-4 justify-center">
          {Array.from({ length: passengerCapacity }).map((_, seatIndex) => {
            const assignedIndex = starshipIndex * passengerCapacity + seatIndex
            const assignedPassenger = passengers[assignedIndex]

            return (
              <PassengerCard
                key={seatIndex}
                passenger={assignedPassenger}
                isAssigned={!!assignedPassenger}
                onAssign={(selectedPassenger) =>
                  onAssignPassenger(selectedPassenger, assignedIndex)
                }
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
