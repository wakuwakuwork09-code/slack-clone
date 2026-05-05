export interface DirectMessage {
  readonly id: string
  readonly name: string
  readonly online: boolean
}

export const directMessages: readonly DirectMessage[] = [
  { id: '1', name: '田中', online: true },
  { id: '2', name: '鈴木', online: false },
  { id: '3', name: '佐藤', online: true },
]
