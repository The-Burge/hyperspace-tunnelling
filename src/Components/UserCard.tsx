import Image from 'next/image'
import React from 'react'

interface PassengerUserCardProps {
  image: string
  firstname: string
  lastname: string
  email: string
  phone: string
}

const PassengerUserCard: React.FC<PassengerUserCardProps> = ({ image, firstname, lastname, email, phone }) => {
  return (
    <div
      id='passenger_card'
      className='relative mx-auto mt-4 max-w-sm rounded-lg shadow-xl'
    >
      <div className='relative z-10 rounded-lg bg-gray-200 p-6 text-center shadow-lg'>
        <div className='relative mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-secondary'>
          <Image
            id='passenger_image'
            src={image}
            alt={firstname}
            height={96}
            width={96}
            className='object-cover'
          />
        </div>
        <div
          id='passenger_details'
          className='mt-4'
        >
          <h2
            id='passenger_name'
            className='font-semibold text-primary'
          >
            {firstname + ' ' + lastname}
          </h2>
          <p
            id='passenger_email'
            className='mt-2 text-primary'
          >
            {email}
          </p>
          <p
            id='passenger_phone'
            className='mt-1 text-secondary'
          >
            {phone}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PassengerUserCard
