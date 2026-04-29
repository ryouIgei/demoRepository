const rules: [RegExp, string][] = [
  [/パスワード|ログイン|リセット/, 'パスワードリセット手順: 社内ポータルの「パスワード忘れ」からリセットできます。問題が続く場合は IT ヘルプデスク（内線 1234）へご連絡ください。'],
  [/VPN|リモート|接続できない/, 'VPN接続手順: VPN クライアント（GlobalProtect）を起動し、会社のゲートウェイアドレスを入力してください。詳細は IT ポータルのリモートワークガイドをご参照ください。'],
  [/パソコン|PC|起動しない/, 'IT サポート窓口: パソコンのトラブルは IT ヘルプデスク（helpdesk@company.com / 内線 1234）にお問い合わせください。リモートサポートも対応しています。'],
  [/有給|休暇|申請/, '勤怠システム案内: 有給・休暇の申請は勤怠管理システム（kintai.company.com）からご申請ください。上長承認後に反映されます。'],
  [/給与|明細|賞与/, '給与ポータル案内: 給与明細・賞与明細は給与ポータル（payroll.company.com）でご確認いただけます。毎月 25 日に更新されます。'],
  [/経費|精算|領収書/, '経費システム案内: 経費精算は経費管理システム（expense.company.com）から申請してください。領収書は PDF でアップロードできます。'],
];

export function getResponse(input: string): string {
  for (const [pattern, response] of rules) {
    if (pattern.test(input)) return response;
  }
  return '担当部署にお問い合わせください。詳細は社内ポータル（portal.company.com）の「お問い合わせ」ページから各部署の連絡先をご確認いただけます。';
}
