const rules: { keywords: string[]; response: string }[] = [
  {
    keywords: ['パスワード', 'ログイン', 'リセット'],
    response:
      'パスワードのリセット手順：\n1. 社内ポータルのログイン画面で「パスワードを忘れた方はこちら」をクリック\n2. 登録メールアドレスを入力して送信\n3. 届いたメールのリンクから新しいパスワードを設定してください。\n\n問題が解決しない場合は IT ヘルプデスク（内線 1234）へご連絡ください。',
  },
  {
    keywords: ['VPN', 'リモート', '接続できない'],
    response:
      'VPN 接続手順：\n1. Cisco AnyConnect を起動し、サーバーアドレス「vpn.company.local」を入力\n2. 社員 ID とパスワードでログイン\n3. 接続後、社内システムへアクセスできます。\n\n接続できない場合はネットワーク管理チーム（network@company.local）へご連絡ください。',
  },
  {
    keywords: ['パソコン', 'PC', '起動しない'],
    response:
      'IT サポート窓口へお問い合わせください：\n・電話: 内線 1234（平日 9:00〜18:00）\n・メール: it-support@company.local\n・チケット: 社内ポータル → IT サポート → 新規チケット\n\n緊急の場合は直接電話でご連絡ください。',
  },
  {
    keywords: ['有給', '休暇', '申請'],
    response:
      '勤怠システムでの申請方法：\n1. 勤怠システム（kintai.company.local）にログイン\n2. 「休暇申請」→「新規申請」を選択\n3. 休暇種別・日時を入力して上長に申請\n4. 承認後、カレンダーに反映されます。\n\n詳細は人事部（hr@company.local）へお問い合わせください。',
  },
  {
    keywords: ['給与', '明細', '賞与'],
    response:
      '給与ポータルでご確認いただけます：\n・URL: salary.company.local\n・ログイン: 社員 ID + パスワード\n・明細は毎月 25 日に公開されます。\n\nご不明な点は経理部（accounting@company.local）へお問い合わせください。',
  },
  {
    keywords: ['経費', '精算', '領収書'],
    response:
      '経費精算システムのご案内：\n1. 経費システム（expense.company.local）にログイン\n2. 「経費申請」→「新規申請」を選択\n3. 領収書を撮影してアップロード\n4. 金額・用途を入力して申請\n\n月末締め・翌月 15 日払いです。詳細は経理部（accounting@company.local）へ。',
  },
];

export function getResponse(input: string): string {
  const normalized = input.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return rule.response;
    }
  }
  return '担当部署へお問い合わせください。\n\nご質問の内容によって対応窓口が異なります。お手数ですが、総務部（soumu@company.local）または社内ポータルの「お問い合わせ」フォームよりご連絡ください。担当者より折り返しご連絡いたします。';
}
