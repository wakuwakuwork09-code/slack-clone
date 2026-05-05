export interface Message {
  readonly id: string
  readonly type: 'channel' | 'dm'
  readonly parentId: string
  readonly userId?: string | null
  readonly userName: string
  readonly body: string
  readonly createdAt: string
  readonly imageUrl?: string
  readonly reactions: Readonly<Record<string, number>>
}

export const initialMessages: readonly Message[] = [
  // --- #general ---
  { id: 'ch1-1', type: 'channel', parentId: '1', userName: '田中太郎', body: 'おはようございます！今日のスタンドアップは10時からです。', reactions: {}, createdAt: '9:00 AM' },
  { id: 'ch1-2', type: 'channel', parentId: '1', userName: '佐藤花子', body: '了解です！資料を準備しておきます。', reactions: {}, createdAt: '9:05 AM' },
  { id: 'ch1-3', type: 'channel', parentId: '1', userName: '鈴木一郎', body: '新しいデザインのモックアップをFigmaに上げました。フィードバックお願いします 🎨', reactions: {}, createdAt: '9:12 AM' },
  { id: 'ch1-4', type: 'channel', parentId: '1', userName: '高橋美咲', body: 'API のエンドポイント仕様書を更新しました。', reactions: {}, createdAt: '9:20 AM' },
  { id: 'ch1-5', type: 'channel', parentId: '1', userName: '伊藤健太', body: 'お昼のランチ会、参加する方はリアクションお願いします 🍕', reactions: {}, createdAt: '10:45 AM' },

  // --- #random ---
  { id: 'ch2-1', type: 'channel', parentId: '2', userName: '佐藤花子', body: '今日のおすすめランチは駅前のカレー屋さんです 🍛', reactions: {}, createdAt: '11:00 AM' },
  { id: 'ch2-2', type: 'channel', parentId: '2', userName: '伊藤健太', body: '週末にハッカソンやりませんか？', reactions: {}, createdAt: '11:15 AM' },
  { id: 'ch2-3', type: 'channel', parentId: '2', userName: '田中太郎', body: 'いいですね！テーマ何にしましょう？', reactions: {}, createdAt: '11:20 AM' },
  { id: 'ch2-4', type: 'channel', parentId: '2', userName: '鈴木一郎', body: 'AIチャットボットとか面白そう', reactions: {}, createdAt: '11:25 AM' },

  // --- #project-a ---
  { id: 'ch3-1', type: 'channel', parentId: '3', userName: '高橋美咲', body: 'Sprint 3のバックログを整理しました。確認お願いします。', reactions: {}, createdAt: '9:30 AM' },
  { id: 'ch3-2', type: 'channel', parentId: '3', userName: '田中太郎', body: 'レビューありがとうございます。修正してプッシュしました。', reactions: {}, createdAt: '9:45 AM' },
  { id: 'ch3-3', type: 'channel', parentId: '3', userName: '伊藤健太', body: 'CI/CDパイプラインの設定を更新しました。ビルド時間が30%短縮 🚀', reactions: {}, createdAt: '10:00 AM' },
  { id: 'ch3-4', type: 'channel', parentId: '3', userName: '佐藤花子', body: 'テストカバレッジが85%に到達しました！', reactions: {}, createdAt: '10:30 AM' },
  { id: 'ch3-5', type: 'channel', parentId: '3', userName: '鈴木一郎', body: 'フロントエンドのレスポンシブ対応、今日中に完了予定です。', reactions: {}, createdAt: '11:00 AM' },

  // --- #design ---
  { id: 'ch4-1', type: 'channel', parentId: '4', userName: '鈴木一郎', body: 'カラーパレットの候補を3パターン用意しました。', reactions: {}, createdAt: '10:00 AM' },
  { id: 'ch4-2', type: 'channel', parentId: '4', userName: '高橋美咲', body: 'パターンBが一番ブランドイメージに近いと思います。', reactions: {}, createdAt: '10:10 AM' },
  { id: 'ch4-3', type: 'channel', parentId: '4', userName: '佐藤花子', body: 'アクセシビリティのコントラスト比もチェックしましょう。', reactions: {}, createdAt: '10:20 AM' },

  // --- #announcements ---
  { id: 'ch5-1', type: 'channel', parentId: '5', userName: '田中太郎', body: '来週月曜は全社ミーティングがあります。10:00〜11:00、会議室Aです。', reactions: {}, createdAt: '8:00 AM' },
  { id: 'ch5-2', type: 'channel', parentId: '5', userName: '高橋美咲', body: '新しいオフィスポリシーが更新されました。Confluenceを確認してください。', reactions: {}, createdAt: '8:30 AM' },
  { id: 'ch5-3', type: 'channel', parentId: '5', userName: '伊藤健太', body: 'セキュリティ研修の申込み締切は今週金曜です。', reactions: {}, createdAt: '9:00 AM' },

  // --- DM 田中 ---
  { id: 'dm1-1', type: 'dm', parentId: '1', userName: '田中', body: 'お疲れさまです。先ほどの件、どうなりましたか？', reactions: {}, createdAt: '2:00 PM' },
  { id: 'dm1-2', type: 'dm', parentId: '1', userName: '自分', body: '対応中です。夕方までに共有しますね。', reactions: {}, createdAt: '2:05 PM' },
  { id: 'dm1-3', type: 'dm', parentId: '1', userName: '田中', body: 'ありがとうございます！よろしくお願いします。', reactions: {}, createdAt: '2:06 PM' },

  // --- DM 鈴木 ---
  { id: 'dm2-1', type: 'dm', parentId: '2', userName: '鈴木', body: 'デザインレビューの日程を調整したいのですが。', reactions: {}, createdAt: '3:00 PM' },
  { id: 'dm2-2', type: 'dm', parentId: '2', userName: '自分', body: '明日の午後はいかがですか？', reactions: {}, createdAt: '3:10 PM' },
  { id: 'dm2-3', type: 'dm', parentId: '2', userName: '鈴木', body: '明日の14時でお願いします！', reactions: {}, createdAt: '3:12 PM' },
  { id: 'dm2-4', type: 'dm', parentId: '2', userName: '自分', body: 'カレンダーに入れておきますね。', reactions: {}, createdAt: '3:15 PM' },

  // --- DM 佐藤 ---
  { id: 'dm3-1', type: 'dm', parentId: '3', userName: '佐藤', body: 'テスト結果のレポート送りました。確認お願いします。', reactions: {}, createdAt: '4:00 PM' },
  { id: 'dm3-2', type: 'dm', parentId: '3', userName: '自分', body: '確認しました。いくつか気になる点があるので後で話しましょう。', reactions: {}, createdAt: '4:15 PM' },
  { id: 'dm3-3', type: 'dm', parentId: '3', userName: '佐藤', body: '了解です。17時頃はどうですか？', reactions: {}, createdAt: '4:20 PM' },
]
