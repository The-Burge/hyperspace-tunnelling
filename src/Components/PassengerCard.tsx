import React, { useState } from 'react'
import { Passenger } from '@/api/fetchPassengers'

type PassengerCardProps = {
  passenger: Passenger | null
  onAssign: (selectedPassenger: Passenger) => void
  onRemove: () => void
  isAssigned: boolean
  unassignedPassengers: Passenger[]
}

const PassengerCard: React.FC<PassengerCardProps> = ({
  passenger,
  onAssign,
  onRemove,
  isAssigned,
  unassignedPassengers,
}) => {
  const [isAssigning, setIsAssigning] = useState(false)

  const handleAssignClick = () => {
    setIsAssigning(true)
  }

  const handleSelectPassenger = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedEmail = event.target.value
    const selectedPassenger = unassignedPassengers.find(
      (p) => p.email === selectedEmail
    )

    if (selectedPassenger) {
      onAssign(selectedPassenger)
      setIsAssigning(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full shadow-md text-lg font-bold ${
          isAssigned ? 'bg-green-500' : 'bg-blue-500'
        }`}
      >
        {isAssigned ? (
          <span>
            {passenger?.firstname[0]}
            {passenger?.lastname[0]}
          </span>
        ) : (
          <span>-</span>
        )}
      </div>
      {isAssigned ? (
        <>
          <p className="text-center mt-2 text-white">{passenger?.firstname}</p>
          <button
            className="mt-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg"
            onClick={onRemove}
          >
            Remove
          </button>
        </>
      ) : (
        <>
          {!isAssigning ? (
            <button
              className="mt-2 bg-primary hover:bg-secondary text-white p-2 rounded-lg"
              onClick={handleAssignClick}
            >
              Assign
            </button>
          ) : (
            <select
              className="mt-2 p-2 bg-gray-200 rounded-lg"
              onChange={handleSelectPassenger}
            >
              <option value="">Select Passenger</option>
              {unassignedPassengers.map((passenger) => (
                <option key={passenger.email} value={passenger.email}>
                  {passenger.firstname} {passenger.lastname}
                </option>
              ))}
            </select>
          )}
        </>
      )}
    </div>
  )
}

export default PassengerCard
