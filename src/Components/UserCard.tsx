import Image from 'next/image'
import React from 'react'

interface PassengerCardProps {
  image: string
  firstname: string
  lastname: string
  email: string
  phone: string
}

const PassengerCard: React.FC<PassengerCardProps> = ({
  image,
  firstname,
  lastname,
  email,
  phone,
}) => {
  return (
    <div
      id="passenger_card"
      className="relative max-w-sm mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-2 shadow-xl rounded-lg text-primary"
    >
      <div className="relative z-10 p-6 bg-white rounded-lg">
        <div className="mx-auto w-20 h-20 relative border-4 border-white rounded-full overflow-hidden">
          <Image
            id="passenger_image"
            src={image}
            alt={firstname}
            height={96}
            width={96}
          />
        </div>
        <div id="passenger_details" className="text-center mt-4">
          <h2 id="passenger_name" className="font-semibold text-primary">
            {firstname + ' ' + lastname}
          </h2>
          <p id="passenger_email" className="text-secondary">
            {email}
          </p>
          <p id="passenger_phone" className="text-secondary">
            {phone}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PassengerCard
