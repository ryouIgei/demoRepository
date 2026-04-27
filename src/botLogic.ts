import type { Category } from './types'

interface BotRule {
  keywords: string[]
  response: string
}

const rules: Record<Category, BotRule[]> = {
  IT: [
    {
      keywords: ['パスワード', 'ログイン', 'password'],
      response: 'パスワードのリセットは IT ポータル（https://it.example.com/reset）から行えます。解決しない場合は IT ヘルプデスクへご連絡ください。',
    },
    {
      keywords: ['VPN', 'vpn', '接続'],
      response: 'VPN の接続手順は社内 Wiki「VPN 設定ガイド」をご参照ください。接続できない場合は IT チームまでお問い合わせください。',
    },
    {
      keywords: ['端末', 'PC', 'パソコン', '故障'],
      response: '端末の故障・交換は IT 資産管理チームへ申請フォームを提出してください。通常 3 営業日以内に対応します。',
    },
  ],
  アカウント: [
    {
      keywords: ['アカウント', '作成', '登録'],
      response: '新規アカウントの作成は所属部門の管理者経由で申請できます。申請フォームは社内ポータルにあります。',
    },
    {
      keywords: ['ロック', 'ロックアウト', 'locked'],
      response: 'アカウントがロックされた場合は IT ヘルプデスク（内線: 1234）へご連絡ください。本人確認後に解除します。',
    },
    {
      keywords: ['権限', 'アクセス', '許可'],
      response: 'アクセス権限の変更は上長の承認が必要です。社内ポータルの「権限申請」フォームからお手続きください。',
    },
  ],
  リモート: [
    {
      keywords: ['リモート', 'テレワーク', '在宅'],
      response: 'リモートワークの申請は毎週金曜日 17 時までに翌週分を申請システムで提出してください。',
    },
    {
      keywords: ['機器', '貸出', 'モニター', 'キーボード'],
      response: 'リモートワーク用機器の貸出は総務部へ申請してください。在庫状況によりご希望に添えない場合があります。',
    },
    {
      keywords: ['通信費', '手当', '補助'],
      response: '通信費補助は月額 2,000 円まで支給されます。経費精算システムから申請してください。',
    },
  ],
  休暇: [
    {
      keywords: ['有給', '年休', '休暇申請'],
      response: '有給休暇の申請は勤怠管理システムから 3 営業日前までに行ってください。',
    },
    {
      keywords: ['残日数', '残り', '何日'],
      response: '有給残日数は勤怠管理システムのマイページ > 「休暇残日数」で確認できます。',
    },
    {
      keywords: ['特別休暇', '慶弔', '育児', '介護'],
      response: '特別休暇（慶弔・育児・介護等）については就業規則 第 X 条をご参照ください。詳細は人事部へご相談ください。',
    },
  ],
  給与: [
    {
      keywords: ['給与明細', '明細', '確認'],
      response: '給与明細は毎月 25 日に給与システムで閲覧できます。ログインには社員番号が必要です。',
    },
    {
      keywords: ['振込', '口座', '変更'],
      response: '給与振込口座の変更は人事部へ「口座変更届」を提出してください。締切は毎月 10 日です。',
    },
    {
      keywords: ['残業', '時間外', '手当'],
      response: '時間外手当は翌月給与に反映されます。勤怠システムで申告漏れがないか毎月末に確認してください。',
    },
  ],
  経費: [
    {
      keywords: ['経費', '精算', '申請'],
      response: '経費精算は発生月の翌月 5 日までに経費精算システムで申請してください。領収書の添付が必須です。',
    },
    {
      keywords: ['交通費', '交通'],
      response: '交通費は経路と金額を経費精算システムに入力し、IC カード履歴または領収書を添付してください。',
    },
    {
      keywords: ['上限', '限度額', 'いくら'],
      response: '経費の上限は部門ごとに異なります。詳細は経費規程または部門長にご確認ください。',
    },
  ],
}

const categoryWelcome: Record<Category, string> = {
  IT: 'IT サポートへようこそ！パスワード・VPN・端末などについてお気軽にご質問ください。',
  アカウント: 'アカウント管理サポートへようこそ！アカウント作成・ロック解除・権限などについてご質問ください。',
  リモート: 'リモートワークサポートへようこそ！申請方法・機器貸出・手当についてご質問ください。',
  休暇: '休暇サポートへようこそ！有給申請・残日数・特別休暇についてご質問ください。',
  給与: '給与サポートへようこそ！給与明細・口座変更・残業手当についてご質問ください。',
  経費: '経費サポートへようこそ！経費精算・交通費・上限についてご質問ください。',
}

const categoryChips: Record<Category, string[]> = {
  IT: ['パスワードをリセットしたい', 'VPN に接続できない', '端末が故障した'],
  アカウント: ['アカウントを作成したい', 'アカウントがロックされた', '権限を変更したい'],
  リモート: ['リモートワークを申請したい', '機器を借りたい', '通信費補助について知りたい'],
  休暇: ['有給を申請したい', '残日数を確認したい', '特別休暇について知りたい'],
  給与: ['給与明細を確認したい', '口座を変更したい', '残業手当について知りたい'],
  経費: ['経費を精算したい', '交通費を申請したい', '上限を確認したい'],
}

export function getWelcomeMessage(category: Category): string {
  return categoryWelcome[category]
}

export function getSuggestChips(category: Category): string[] {
  return categoryChips[category]
}

export function getBotResponse(text: string, category: Category): string {
  const lower = text.toLowerCase()
  const categoryRules = rules[category]

  for (const rule of categoryRules) {
    if (rule.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return rule.response
    }
  }

  // 全カテゴリをまたいで検索
  for (const cat of Object.keys(rules) as Category[]) {
    if (cat === category) continue
    for (const rule of rules[cat]) {
      if (rule.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
        return rule.response
      }
    }
  }

  return `ご質問ありがとうございます。「${text}」についての詳細は担当部門へお問い合わせいただくか、社内ポータルをご確認ください。`
}
