type Rule = {
  keywords: string[]
  response: string
}

const rules: Rule[] = [
  {
    keywords: ['パスワード', 'ログイン', 'ログインできない', 'password'],
    response:
      'パスワードのリセットは社内ポータル（portal.company.internal）の「アカウント設定」から行えます。解決しない場合は IT ヘルプデスク（内線: 1234）へご連絡ください。',
  },
  {
    keywords: ['pc', 'パソコン', '起動しない', 'フリーズ', '遅い'],
    response:
      'まず PC を再起動してみてください。改善しない場合は IT ヘルプデスクへ端末名とエラー内容をご連絡ください。リモートサポートも対応しています（内線: 1234）。',
  },
  {
    keywords: ['vpn', 'リモート', '在宅', 'テレワーク'],
    response:
      'VPN の接続方法は社内 Wiki（wiki.company.internal/vpn）に手順書があります。証明書の更新が必要な場合は IT ヘルプデスクへご連絡ください。',
  },
  {
    keywords: ['有給', '休暇', '休み', '有休'],
    response:
      '有給休暇の申請は HR システム（hr.company.internal）から行えます。残日数の確認も同システムで可能です。詳細は HR 部門（内線: 5678）までお問い合わせください。',
  },
  {
    keywords: ['給与', '給料', '明細', '賞与'],
    response:
      '給与明細は毎月 25 日に HR システムで確認できます。給与に関するご質問は HR 部門（内線: 5678）または payroll@company.internal までお問い合わせください。',
  },
  {
    keywords: ['入社', 'オンボーディング', '研修'],
    response:
      'オンボーディング資料は社内 Wiki（wiki.company.internal/onboarding）にまとめています。担当 HR 担当者への連絡は onboarding@company.internal です。',
  },
  {
    keywords: ['経費', '交通費', '領収書', '精算'],
    response:
      '経費精算は経費管理システム（expense.company.internal）から申請できます。申請期限は翌月 5 日です。領収書は PDF でアップロードしてください。',
  },
  {
    keywords: ['出張', '旅費', '新幹線', '飛行機'],
    response:
      '出張申請は経費管理システムの「出張申請」メニューから事前に行ってください。交通費・宿泊費の上限は社内規程（wiki.company.internal/travel）をご確認ください。',
  },
  {
    keywords: ['請求', '振込', '支払い', '精算期限'],
    response:
      '支払い・精算に関するお問い合わせは経理部（accounting@company.internal、内線: 9012）までご連絡ください。',
  },
]

const fallback =
  'ご質問ありがとうございます。担当部署に確認が必要な内容です。IT サポート（内線: 1234）または HR 部門（内線: 5678）までお気軽にお問い合わせください。'

export function getBotResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const rule of rules) {
    if (rule.keywords.some(k => lower.includes(k))) {
      return rule.response
    }
  }
  return fallback
}
