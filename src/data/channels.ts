export interface Channel {
  readonly id: string
  readonly name: string
}

export const channels: readonly Channel[] = [
  { id: 'ch-1', name: 'general' },
  { id: 'ch-2', name: 'random' },
  { id: 'ch-3', name: 'project-a' },
  { id: 'ch-4', name: 'design' },
  { id: 'ch-5', name: 'announcements' },
]
