export interface Message {
  readonly id: string
  readonly type: 'channel' | 'dm'
  readonly parentId: string
  readonly userName: string
  readonly body: string
  readonly createdAt: string
  readonly reactions: Readonly<Record<string, number>>
}

export const messages: readonly Message[] = [
  // #general
  { id: '1', type: 'channel', parentId: 'ch-1', userName: '田中太郎', body: 'おはようございます！今日のスタンドアップは10時からです。', createdAt: '9:00 AM', reactions: {} },
  { id: '2', type: 'channel', parentId: 'ch-1', userName: '佐藤花子', body: '了解です！資料を準備しておきます。', createdAt: '9:05 AM', reactions: {} },
  { id: '3', type: 'channel', parentId: 'ch-1', userName: '鈴木一郎', body: '新しいデザインのモックアップをFigmaに上げました。フィードバックお願いします', createdAt: '9:12 AM', reactions: {} },
  { id: '4', type: 'channel', parentId: 'ch-1', userName: '高橋美咲', body: 'API のエンドポイント仕様書を更新しました。Confluenceを確認してください。', createdAt: '9:20 AM', reactions: {} },
  { id: '5', type: 'channel', parentId: 'ch-1', userName: '伊藤健太', body: 'お昼のランチ会、参加する方はリアクションお願いします', createdAt: '10:45 AM', reactions: {} },

  // #random
  { id: '6', type: 'channel', parentId: 'ch-2', userName: '佐藤花子', body: '昨日のドラマ見た人いますか？', createdAt: '9:30 AM', reactions: {} },
  { id: '7', type: 'channel', parentId: 'ch-2', userName: '伊藤健太', body: '見ました！最終回が衝撃的でしたね', createdAt: '9:35 AM', reactions: {} },
  { id: '8', type: 'channel', parentId: 'ch-2', userName: '田中太郎', body: '今週末フットサルやりませんか？', createdAt: '10:00 AM', reactions: {} },

  // #project-a
  { id: '9', type: 'channel', parentId: 'ch-3', userName: '高橋美咲', body: 'Sprint 3のバックログを整理しました。確認お願いします。', createdAt: '9:00 AM', reactions: {} },
  { id: '10', type: 'channel', parentId: 'ch-3', userName: '田中太郎', body: 'レビューありがとうございます。修正してプッシュしました。', createdAt: '11:00 AM', reactions: {} },
  { id: '11', type: 'channel', parentId: 'ch-3', userName: '鈴木一郎', body: 'フロントエンドのレスポンシブ対応、今日中に完了予定です。', createdAt: '1:00 PM', reactions: {} },
  { id: '12', type: 'channel', parentId: 'ch-3', userName: '佐藤花子', body: 'テストカバレッジが85%に到達しました！', createdAt: '2:00 PM', reactions: {} },

  // #design
  { id: '13', type: 'channel', parentId: 'ch-4', userName: '鈴木一郎', body: 'カラーパレットの最終案をFigmaに共有しました', createdAt: '10:00 AM', reactions: {} },
  { id: '14', type: 'channel', parentId: 'ch-4', userName: '高橋美咲', body: 'ダークモードのコントラスト比をチェックしてもらえますか？', createdAt: '10:30 AM', reactions: {} },
  { id: '15', type: 'channel', parentId: 'ch-4', userName: '鈴木一郎', body: 'アイコンセットをLucideに統一する方向で進めます', createdAt: '11:15 AM', reactions: {} },

  // #announcements
  { id: '16', type: 'channel', parentId: 'ch-5', userName: '田中太郎', body: '来週月曜は全社ミーティングです。10時に大会議室に集合してください。', createdAt: '9:00 AM', reactions: {} },
  { id: '17', type: 'channel', parentId: 'ch-5', userName: '高橋美咲', body: '新しいオフィスのWi-Fiパスワードが変更されました。詳細はメールを確認してください。', createdAt: '2:00 PM', reactions: {} },
  { id: '18', type: 'channel', parentId: 'ch-5', userName: '伊藤健太', body: 'CI/CDパイプラインの設定を更新しました。ビルド時間が30%短縮されました', createdAt: '3:00 PM', reactions: {} },

  // DM: 田中
  { id: '19', type: 'dm', parentId: '1', userName: '田中', body: '例のプルリクエスト、確認お願いできますか？', createdAt: '9:15 AM', reactions: {} },
  { id: '20', type: 'dm', parentId: '1', userName: '自分', body: '了解、午前中に見ておきます！', createdAt: '9:20 AM', reactions: {} },
  { id: '21', type: 'dm', parentId: '1', userName: '田中', body: 'ありがとうございます！急ぎではないので大丈夫です', createdAt: '9:22 AM', reactions: {} },

  // DM: 鈴木
  { id: '22', type: 'dm', parentId: '2', userName: '鈴木', body: 'デザインレビューの日程、いつが都合いいですか？', createdAt: '10:00 AM', reactions: {} },
  { id: '23', type: 'dm', parentId: '2', userName: '自分', body: '水曜の午後はどうですか？', createdAt: '10:05 AM', reactions: {} },
  { id: '24', type: 'dm', parentId: '2', userName: '鈴木', body: '水曜午後で大丈夫です。カレンダー入れておきますね', createdAt: '10:10 AM', reactions: {} },
  { id: '25', type: 'dm', parentId: '2', userName: '自分', body: 'よろしくお願いします！', createdAt: '10:12 AM', reactions: {} },

  // DM: 佐藤
  { id: '26', type: 'dm', parentId: '3', userName: '佐藤', body: 'テスト環境のデプロイ、完了しました', createdAt: '11:00 AM', reactions: {} },
  { id: '27', type: 'dm', parentId: '3', userName: '自分', body: '確認します。ステージングのURLを送ってもらえますか？', createdAt: '11:05 AM', reactions: {} },
  { id: '28', type: 'dm', parentId: '3', userName: '佐藤', body: '共有ドキュメントに記載してあります。検索してみてください', createdAt: '11:08 AM', reactions: {} },
]
