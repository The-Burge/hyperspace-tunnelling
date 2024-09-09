'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardBody } from '@material-tailwind/react'

interface WidgetProps {
  img: string
  name: string
  page: string
}

interface WidgetList {
  items: WidgetProps
}

export function Widget({ items }: WidgetList) {
  const { img, name, page } = items
  const router = useRouter()

  const handleCardClick = () => {
    router.push(page)
  }

  return (
    <Card
      shadow={false}
      className='w-full max-w-xs transform cursor-pointer bg-transparent transition duration-200 hover:scale-105'
      onClick={handleCardClick}
    >
      <CardBody className='pb-0'>
        <Image
          src={img}
          alt={name}
          width={240}
          height={240}
          className='w-full min-w-[280px] transition duration-200 hover:scale-105'
        />
        <p className='text-center text-lg font-semibold text-primary transition duration-200 hover:text-secondary'>
          {name}
        </p>
      </CardBody>
    </Card>
  )
}
