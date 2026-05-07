export interface Message {
  readonly id: string
  readonly userName: string
  readonly body: string
  readonly createdAt: string
}

export const messages: readonly Message[] = [
  { id: '1', userName: '田中太郎', body: 'おはようございます！今日のスタンドアップは10時からです。', createdAt: '9:00 AM' },
  { id: '2', userName: '佐藤花子', body: '了解です！資料を準備しておきます。', createdAt: '9:05 AM' },
  { id: '3', userName: '鈴木一郎', body: '新しいデザインのモックアップをFigmaに上げました。フィードバックお願いします 🎨', createdAt: '9:12 AM' },
  { id: '4', userName: '高橋美咲', body: 'API のエンドポイント仕様書を更新しました。Confluenceを確認してください。', createdAt: '9:20 AM' },
  { id: '5', userName: '伊藤健太', body: 'お昼のランチ会、参加する方はリアクションお願いします 🍕', createdAt: '10:45 AM' },
  { id: '6', userName: '田中太郎', body: 'レビューありがとうございます。修正してプッシュしました。', createdAt: '11:00 AM' },
  { id: '7', userName: '佐藤花子', body: 'テストカバレッジが85%に到達しました！', createdAt: '11:30 AM' },
  { id: '8', userName: '鈴木一郎', body: 'フロントエンドのレスポンシブ対応、今日中に完了予定です。', createdAt: '1:00 PM' },
  { id: '9', userName: '高橋美咲', body: 'Sprint 3のバックログを整理しました。確認お願いします。', createdAt: '2:15 PM' },
  { id: '10', userName: '伊藤健太', body: 'CI/CDパイプラインの設定を更新しました。ビルド時間が30%短縮されました 🚀', createdAt: '3:00 PM' },
]
