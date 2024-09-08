'use client'
import { Widget } from '@/Components/widget'
import React from 'react'

const products = [
  {
    img: '/image/passengers.png',
    name: 'View Passengers',
    page: '/view-passengers',
  },
  {
    img: '/image/assign.png',
    name: 'Assign Passengers',
    page: '/assign-passengers',
  },
  {
    img: '/image/Checkin.png',
    name: 'Checkin Passengers',
    page: '/view-checkin',
  },
]

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col mx-auto w-full max-w-screen-2xl p-4">
      <div className="flex justify-center items-center pt-2 lg:pt-5">
        <div className="lg:text-5xl text-2xl font-semibold text-center text-primary">
          Welcome to StarSeeker Gate Agent
          <p className="!font-normal pt-10 text-lg">
            Please select one of the following options
          </p>
        </div>
      </div>
      <div className="pt-4">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-center p-5">
          {products.map((product, index) => (
            <Widget key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
