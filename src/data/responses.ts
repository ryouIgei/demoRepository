import type { Category, SuggestChip } from '../types';

interface BotResponse {
  keywords: string[];
  answer: string;
}

const botResponses: BotResponse[] = [
  {
    keywords: ['パスワード', 'ログイン', 'サインイン', '認証'],
    answer: 'パスワードのリセットはITヘルプデスクポータル（it-help.company.internal）から行えます。「パスワードリセット」を選択し、社員番号を入力してください。メールに手順が届きます。',
  },
  {
    keywords: ['VPN', 'リモート', 'テレワーク', '在宅', '接続'],
    answer: 'VPNへの接続は「GlobalProtect」アプリを使用します。起動後、会社のゲートウェイアドレスを入力し、社員IDとパスワードでログインしてください。接続できない場合はITサポートへご連絡ください。',
  },
  {
    keywords: ['有給', '休暇', '休み', '申請', '年休'],
    answer: '有給休暇の申請は人事ポータル（hr.company.internal）から行えます。「休暇申請」メニューを選択し、取得日と理由を入力して上長へ承認申請を送ってください。残日数も同画面で確認できます。',
  },
  {
    keywords: ['給与', '給料', '明細', '支給'],
    answer: '給与明細は毎月25日に給与システム（payroll.company.internal）で確認できます。ログイン後「給与明細」から対象月を選択してください。疑問点は経理部（payroll@company.com）へお問い合わせください。',
  },
  {
    keywords: ['経費', '精算', '立替', '領収書', '交通費'],
    answer: '経費精算は経費管理システム（expense.company.internal）から申請できます。領収書を撮影してアップロードし、金額・用途を入力後、上長へ申請してください。承認後2週間以内に振り込まれます。',
  },
  {
    keywords: ['アカウント', '作成', '追加', 'ID', 'メール'],
    answer: '新規アカウントの作成はITヘルプデスク（it-help@company.com）へ依頼してください。氏名・部署・役職・必要なシステムを記載してメール送信するか、ポータルから申請フォームを提出してください。',
  },
  {
    keywords: ['PC', 'パソコン', 'コンピュータ', '故障', '不具合'],
    answer: 'PCの不具合はITサポート（内線: 1234 / it-support@company.com）へご連絡ください。リモートサポートや交換機の手配が可能です。緊急の場合は直接ITフロア（3F）へお越しください。',
  },
];

export function getBotResponse(query: string): string {
  const lower = query.toLowerCase();
  for (const item of botResponses) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.answer;
    }
  }
  return 'ご質問ありがとうございます。担当部署に確認が必要な内容です。詳細をITヘルプデスク（it-help@company.com）または内線1234までお問い合わせください。';
}

export const suggestsByCategory: Record<Category, SuggestChip[]> = {
  IT: [
    { label: 'パスワードをリセットしたい', query: 'パスワードをリセットしたい' },
    { label: 'PCが起動しない', query: 'PCが起動しない' },
    { label: 'VPNに接続できない', query: 'VPNに接続できない' },
  ],
  アカウント: [
    { label: '新規アカウントを作成したい', query: '新規アカウントを作成したい' },
    { label: 'メールIDを変更したい', query: 'メールIDを変更したい' },
    { label: 'アカウントがロックされた', query: 'アカウントがロックされた' },
  ],
  リモート: [
    { label: 'VPNの接続方法を知りたい', query: 'VPNの接続方法を知りたい' },
    { label: 'リモートデスクトップの使い方', query: 'リモートデスクトップの使い方' },
    { label: 'テレワーク申請の手続き', query: 'テレワーク申請の手続き' },
  ],
  休暇: [
    { label: '有給休暇の申請方法', query: '有給休暇の申請方法' },
    { label: '残日数を確認したい', query: '有給残日数を確認したい' },
    { label: '特別休暇の種類を知りたい', query: '特別休暇の種類を知りたい' },
  ],
  給与: [
    { label: '給与明細の確認方法', query: '給与明細の確認方法' },
    { label: '振込口座を変更したい', query: '給与の振込口座を変更したい' },
    { label: '給与の計算方法を知りたい', query: '給与の計算方法を知りたい' },
  ],
  経費: [
    { label: '経費精算の手順', query: '経費精算の手順' },
    { label: '領収書の添付方法', query: '領収書の添付方法' },
    { label: '交通費の申請方法', query: '交通費の申請方法' },
  ],
};

export const defaultSuggests: SuggestChip[] = [
  { label: 'パスワードをリセットしたい', query: 'パスワードをリセットしたい' },
  { label: '有給休暇を申請したい', query: '有給休暇を申請したい' },
  { label: 'VPNに接続できない', query: 'VPNに接続できない' },
  { label: '経費精算の手順', query: '経費精算の手順' },
];
