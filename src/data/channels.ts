export interface Channel {
  readonly id: string
  readonly name: string
}

export const channels: readonly Channel[] = [
  { id: '1', name: 'general' },
  { id: '2', name: 'random' },
  { id: '3', name: 'project-a' },
  { id: '4', name: 'design' },
  { id: '5', name: 'announcements' },
]
