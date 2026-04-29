const rules: { keywords: string[]; response: string }[] = [
  {
    keywords: ['パスワード', 'ログイン', 'リセット'],
    response:
      'パスワードリセット手順: 社内ポータルの「パスワードを忘れた方」からリセットメールを送信してください。メールが届かない場合は IT ヘルプデスク (ext. 1234) へご連絡ください。',
  },
  {
    keywords: ['VPN', 'リモート', '接続できない'],
    response:
      'VPN接続手順: ①Cisco AnyConnect を起動 ②サーバーアドレス vpn.company.com を入力 ③社員番号とパスワードでログイン。それでも繋がらない場合は IT サポートへお問い合わせください。',
  },
  {
    keywords: ['パソコン', 'PC', '起動しない'],
    response:
      'IT サポート窓口: 社内チャット #it-support チャンネルまたは ext. 1234 にご連絡ください。リモートサポートも可能です。',
  },
  {
    keywords: ['有給', '休暇', '申請'],
    response:
      '勤怠システム案内: 勤怠管理システム (https://kintai.company.com) から有給申請が可能です。申請後、上長の承認で完了します。',
  },
  {
    keywords: ['給与', '明細', '賞与'],
    response:
      '給与ポータル案内: 給与明細は給与ポータル (https://kyuyo.company.com) でご確認いただけます。IDは社員番号、初期パスワードは生年月日です。',
  },
  {
    keywords: ['経費', '精算', '領収書'],
    response:
      '経費システム案内: 経費精算は経費システム (https://keihi.company.com) から申請してください。領収書は PDF でアップロードが可能です。',
  },
];

export function getResponse(input: string): string {
  const matched = rules.find((rule) =>
    rule.keywords.some((kw) => input.includes(kw))
  );
  return (
    matched?.response ??
    'ご質問ありがとうございます。担当部署への問い合わせフォーム (https://portal.company.com/inquiry) からお問い合わせください。担当者より折り返しご連絡いたします。'
  );
}
