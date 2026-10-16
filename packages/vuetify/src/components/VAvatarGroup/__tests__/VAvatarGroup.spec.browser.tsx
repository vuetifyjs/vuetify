import { VAvatarGroup } from '../VAvatarGroup'

// Utilities
import { render, screen } from '@test'

const items = [
  { text: 'AB', color: 'primary' },
  { text: 'CD', color: 'secondary' },
  { text: 'EF', color: 'success' },
  { text: 'GH', color: 'warning' },
  { text: 'IJ', color: 'error' },
]

describe('VAvatarGroup', () => {
  it('should apply border to avatars', () => {
    render(() => <VAvatarGroup items={ items } border="md" />)

    const avatars = screen.getByCSS('.v-avatar-group').querySelectorAll('.v-avatar')
    avatars.forEach(avatar => {
      expect(avatar).toHaveClass('border-md')
    })
  })

  it('should set gap css variable', () => {
    render(() => <VAvatarGroup items={ items } gap={ -16 } />)

    const group = screen.getByCSS('.v-avatar-group')
    expect(group).toHaveStyle('--v-avatar-group-gap: -16px')
  })

  it('should show all items if they fit within limit', () => {
    render(() => <VAvatarGroup items={ items } limit={ 5 } />)

    const avatars = screen.getByCSS('.v-avatar-group__content').querySelectorAll('.v-avatar')
    expect(avatars).toHaveLength(5)
    expect(avatars[4]).toHaveTextContent('IJ')
  })

  it('should limit visible items and show overflow', () => {
    render(() => <VAvatarGroup items={ items } limit={ 3 } />)

    const avatars = screen.getByCSS('.v-avatar-group__content').querySelectorAll('.v-avatar')
    expect(avatars).toHaveLength(3) // 2 items + overflow
    expect(avatars[2]).toHaveTextContent('+3')
  })

  it('should use custom overflowText', () => {
    render(() => <VAvatarGroup items={ items } limit={ 2 } overflowText="and 4 more" />)

    const overflow = screen.getByCSS('.v-avatar-group__overflow')
    expect(overflow).toHaveTextContent('and 4 more')
  })

  it('should apply vertical class', () => {
    render(() => <VAvatarGroup items={ items } vertical />)

    const group = screen.getByCSS('.v-avatar-group')
    expect(group).toHaveClass('v-avatar-group--vertical')
    expect(group).not.toHaveClass('v-avatar-group--horizontal')
  })
})
