type Rule = { keywords: string[]; response: string }

const RULES: Rule[] = [
  {
    keywords: ['パスワード', 'ログイン', 'サインイン', 'リセット'],
    response: 'パスワードのリセットは社内ポータル（portal.company.jp）の「アカウント設定」→「パスワード変更」から行えます。ロックされた場合は IT ヘルプデスク（内線: 1234）へご連絡ください。',
  },
  {
    keywords: ['VPN', 'リモート', 'テレワーク', '接続できない', '繋がらない'],
    response: 'VPN 接続には GlobalProtect クライアントを使用します。接続先: vpn.company.jp、ID はメールアドレスです。問題が続く場合は IT サポート（内線: 1234）へお問い合わせください。',
  },
  {
    keywords: ['パソコン', 'PC', '起動', 'フリーズ', '動かない', '遅い'],
    response: 'まず再起動をお試しください。それでも解決しない場合は IT サポート（内線: 1234）または support@company.jp までご連絡ください。リモート対応も可能です。',
  },
  {
    keywords: ['有給', '休暇', '申請', '休み'],
    response: '有給休暇の申請は勤怠システム（kintai.company.jp）から行えます。申請は取得希望日の 3 営業日前までにお願いします。承認フローは上長 → HR 部門の順です。',
  },
  {
    keywords: ['給与', '給料', '明細', '賞与', 'ボーナス'],
    response: '給与明細は給与ポータル（payroll.company.jp）でご確認いただけます。毎月 25 日払いです。ご不明な点は HR 部門（内線: 5678）までお問い合わせください。',
  },
  {
    keywords: ['経費', '精算', '領収書', '交通費', '出張'],
    response: '経費精算は経費管理システム（expense.company.jp）から申請してください。領収書は PDF でアップロード可能です。締め日は毎月 20 日、翌月末払いとなります。',
  },
  {
    keywords: ['入社', 'オンボーディング', '研修', '新入'],
    response: 'オンボーディング資料は社内 Wiki（wiki.company.jp/onboarding）にまとめています。不明点は HR 担当（内線: 5678）または配属先の上長にご確認ください。',
  },
  {
    keywords: ['会議室', '予約', 'スペース'],
    response: '会議室の予約は社内カレンダー（calendar.company.jp）から行えます。当日の空き状況はリアルタイムで確認できます。',
  },
]

const FALLBACK = 'ご質問ありがとうございます。担当部署に確認が必要な内容です。IT サポート（内線: 1234）または HR 部門（内線: 5678）までお気軽にお問い合わせください。'

export function getResponse(input: string): string {
  const text = input.toLowerCase()
  const matched = RULES.find(r => r.keywords.some(k => text.includes(k.toLowerCase())))
  return matched ? matched.response : FALLBACK
}
