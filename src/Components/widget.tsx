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
      className="w-full max-w-xs cursor-pointer transition duration-200 transform hover:scale-105 bg-transparent"
      onClick={handleCardClick}
    >
      <CardBody className="pb-0">
        <Image
          src={img}
          alt={name}
          width={240}
          height={240}
          className="min-w-[280px] w-full transition duration-200 hover:scale-105"
        />
        <p className="text-lg font-semibold text-primary text-center transition duration-200 hover:text-secondary">
          {name}
        </p>
      </CardBody>
    </Card>
  )
}
