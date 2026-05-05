export interface Message {
  readonly id: string
  readonly user: string
  readonly avatar: string
  readonly time: string
  readonly body: string
}

export const messages: readonly Message[] = [
  {
    id: '1',
    user: '田中太郎',
    avatar: 'TT',
    time: '9:00 AM',
    body: 'おはようございます！今日のスタンドアップは10時からです。',
  },
  {
    id: '2',
    user: '佐藤花子',
    avatar: 'SH',
    time: '9:05 AM',
    body: '了解です！資料を準備しておきます。',
  },
  {
    id: '3',
    user: '鈴木一郎',
    avatar: 'SI',
    time: '9:12 AM',
    body: '新しいデザインのモックアップをFigmaに上げました。フィードバックお願いします 🎨',
  },
  {
    id: '4',
    user: '高橋美咲',
    avatar: 'TM',
    time: '9:20 AM',
    body: 'API のエンドポイント仕様書を更新しました。Confluenceのリンクを共有します。',
  },
  {
    id: '5',
    user: '田中太郎',
    avatar: 'TT',
    time: '9:35 AM',
    body: 'レビューありがとうございます。修正してプッシュしました。',
  },
  {
    id: '6',
    user: '伊藤健太',
    avatar: 'IK',
    time: '9:42 AM',
    body: 'CI/CDパイプラインの設定を更新しました。ビルド時間が30%短縮されています 🚀',
  },
  {
    id: '7',
    user: '佐藤花子',
    avatar: 'SH',
    time: '10:00 AM',
    body: 'スタンドアップ始めましょう！今日の進捗を共有してください。',
  },
  {
    id: '8',
    user: '鈴木一郎',
    avatar: 'SI',
    time: '10:15 AM',
    body: 'フロントエンドのレスポンシブ対応、今日中に完了予定です。',
  },
  {
    id: '9',
    user: '高橋美咲',
    avatar: 'TM',
    time: '10:30 AM',
    body: 'テストカバレッジが85%に達しました。残りのエッジケースも今週中に対応します。',
  },
  {
    id: '10',
    user: '伊藤健太',
    avatar: 'IK',
    time: '10:45 AM',
    body: 'お昼のランチ会、参加する方はリアクションお願いします 🍕',
  },
]
