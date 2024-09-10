import { Widget } from '@/Components/widget'
import React from 'react'

const widgets = [
  {
    img: '/image/passengers.png',
    name: 'View Passengers',
    page: '/view-passengers'
  },
  {
    img: '/image/assign.png',
    name: 'Assign Passengers',
    page: '/assign-passengers'
  },
  {
    img: '/image/Checkin.png',
    name: 'Checkin Passengers',
    page: '/view-checkin'
  }
]

export default function Home() {
  return (
    <div className='mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center p-4'>
      <div className='flex items-center justify-center pt-2 lg:pt-5'>
        <div className='text-center text-2xl font-semibold text-primary lg:text-5xl'>
          Welcome to StarSeeker Gate Agent
          <p className='pt-10 text-lg !font-normal'>Please select one of the following options</p>
        </div>
      </div>
      <div className='pt-4'>
        <div className='grid grid-cols-1 place-items-center justify-items-center gap-20 p-5 md:grid-cols-2 lg:grid-cols-3'>
          {widgets.map((items, index) => (
            <Widget
              key={index}
              items={items}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
