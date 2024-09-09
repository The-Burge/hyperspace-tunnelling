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
  unassignedPassengers
}) => {
  const [isAssigning, setIsAssigning] = useState(false)

  const handleAssignClick = () => {
    setIsAssigning(true)
  }

  const handleSelectPassenger = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmail = event.target.value
    const selectedPassenger = unassignedPassengers.find(p => p.email === selectedEmail)

    if (selectedPassenger) {
      onAssign(selectedPassenger)
      setIsAssigning(false)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold shadow-md ${
          isAssigned ? 'bg-secondary' : 'bg-gray-500'
        } text-white`}
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
          <p className='mt-2 text-center text-primary'>{passenger?.firstname}</p>
          <button
            className='mt-2 rounded-lg bg-red-500 p-2 text-white hover:bg-red-700'
            onClick={onRemove}
          >
            Remove
          </button>
        </>
      ) : (
        <>
          {!isAssigning ? (
            <button
              className='mt-2 rounded-lg bg-secondary p-2 text-white hover:bg-blue-600'
              onClick={handleAssignClick}
            >
              Assign
            </button>
          ) : (
            <select
              className='bg-forground mt-2 rounded-lg p-2 text-primary'
              onChange={handleSelectPassenger}
            >
              <option value=''>Select Passenger</option>
              {unassignedPassengers.map(passenger => (
                <option
                  key={passenger.email}
                  value={passenger.email}
                >
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
