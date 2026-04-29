const rules: { keywords: string[]; response: string }[] = [
  {
    keywords: ['パスワード', 'ログイン', 'リセット'],
    response:
      'パスワードリセット手順:\n1. https://id.company.example/reset にアクセス\n2. 社員番号とメールアドレスを入力\n3. 届いたメールのリンクから新しいパスワードを設定してください。',
  },
  {
    keywords: ['VPN', 'リモート', '接続できない'],
    response:
      'VPN接続手順:\n1. GlobalProtect を起動\n2. ゲートウェイに vpn.company.example を入力\n3. 社員番号とパスワードでサインイン\n問題が続く場合は IT ヘルプデスク (内線 1234) へ。',
  },
  {
    keywords: ['パソコン', 'PC', '起動しない'],
    response:
      'IT サポート窓口にご連絡ください。\n受付時間: 平日 9:00〜18:00\n電話: 内線 1234\nメール: it-support@company.example',
  },
  {
    keywords: ['有給', '休暇', '申請'],
    response:
      '勤怠システム (KING OF TIME) から申請できます。\nhttps://hr.company.example/attendance\nわからない場合は HR 担当者 (内線 5678) にご相談ください。',
  },
  {
    keywords: ['給与', '明細', '賞与'],
    response:
      '給与明細は給与ポータルで確認できます。\nhttps://hr.company.example/payroll\nID とパスワードは初回設定メールに記載されています。',
  },
  {
    keywords: ['経費', '精算', '領収書'],
    response:
      '経費精算システム (Concur) をご利用ください。\nhttps://concur.company.example\n申請期限は翌月 5 日です。領収書は PDF でアップロードしてください。',
  },
]

export function getResponse(input: string): string {
  const normalized = input.toLowerCase()
  for (const rule of rules) {
    if (rule.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return rule.response
    }
  }
  return '担当部署へお問い合わせください。\n総合お問い合わせフォーム: https://intranet.company.example/contact\nまたは総務部 (内線 9000) までご連絡ください。'
}
