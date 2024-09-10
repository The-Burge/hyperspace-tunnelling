import { fireEvent, render, screen } from '@testing-library/react'
import { Widget } from '../Widget'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: () => null
  })
}))

describe('Does the widget work?', () => {
  const mockProps = {
    img: '/images/profile.jpg',
    name: 'Lance Armstrong',
    page: '/space/moon'
  }

  const mockPush = jest.fn()

  beforeEach(() => {
    mockPush.mockClear()
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
      push: mockPush,
      prefetch: () => null
    })
  })

  it('renders widget card', () => {
    render(<Widget items={mockProps} />)
    expect(document.getElementById('widget_card')).toBeInTheDocument()
  })

  it('renders widget card content', () => {
    render(<Widget items={mockProps} />)
    expect(document.getElementById('widget_card')).toBeInTheDocument()
    expect(document.getElementById('widget_body')).toBeInTheDocument()
    expect(document.getElementById('widget_image')).toBeInTheDocument()
    expect(document.getElementById('widget_text')).toBeInTheDocument()
    expect(screen.getByText('Lance Armstrong')).toBeInTheDocument()
  })

  it('should call the correct page on click', () => {
    render(<Widget items={mockProps} />)

    fireEvent.click(document.getElementById('widget_card')!)

    expect(mockPush).toHaveBeenCalledWith('/space/moon')
  })
})
