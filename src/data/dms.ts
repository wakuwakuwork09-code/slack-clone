export interface DirectMessage {
  readonly id: string
  readonly userName: string
  readonly online: boolean
}

export const directMessages: readonly DirectMessage[] = [
  { id: '1', userName: '田中', online: true },
  { id: '2', userName: '鈴木', online: false },
  { id: '3', userName: '佐藤', online: true },
]
