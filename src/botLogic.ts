export type Category = 'IT' | 'アカウント' | 'リモート' | '休暇' | '給与' | '経費';

export interface BotResponse {
  text: string;
  suggestions: string[];
}

const rules: Array<{ keywords: string[]; category: Category; response: BotResponse }> = [
  {
    keywords: ['パスワード', 'ログイン', 'サインイン', 'pw', 'pass'],
    category: 'IT',
    response: {
      text: 'パスワードのリセットはIT自助ポータル（https://it-portal.example.com）から行えます。\n解決しない場合は IT ヘルプデスク（内線: 1234）へご連絡ください。',
      suggestions: ['パスワードポリシーを確認する', '多要素認証の設定', 'IT担当者に連絡'],
    },
  },
  {
    keywords: ['PC', 'パソコン', 'ネットワーク', 'wifi', 'Wi-Fi', 'VPN', 'ソフト', 'インストール'],
    category: 'IT',
    response: {
      text: 'IT機器・ネットワークのトラブルはIT部門が対応します。\n緊急の場合は内線 1234、通常は ITチケットシステムでご申請ください。',
      suggestions: ['ITチケットを起票する', 'VPN接続手順を見る', 'ネットワーク障害情報を確認'],
    },
  },
  {
    keywords: ['アカウント', 'メール', 'ID', '権限', 'アクセス'],
    category: 'アカウント',
    response: {
      text: 'アカウント・権限に関するお申し込みは上長の承認後、総務部へご提出ください。\n申請フォームは社内ポータルからダウンロードできます。',
      suggestions: ['申請フォームをダウンロード', '権限一覧を確認', '上長へ承認依頼'],
    },
  },
  {
    keywords: ['リモート', 'テレワーク', '在宅', 'リモートワーク'],
    category: 'リモート',
    response: {
      text: 'リモートワークの申請は毎週金曜 17:00 までに勤怠システムで行ってください。\n利用可能日数は月 10 日までです。',
      suggestions: ['リモートワーク申請をする', 'リモート規定を確認', '勤怠システムを開く'],
    },
  },
  {
    keywords: ['有給', '休暇', '休み', '年休', 'PTO'],
    category: '休暇',
    response: {
      text: '有給休暇の申請は勤怠システムから行えます。\n残日数の確認も同システムの「休暇照会」タブでできます。',
      suggestions: ['有給申請をする', '残日数を確認', '特別休暇の種類を見る'],
    },
  },
  {
    keywords: ['給与', '給料', '賞与', 'ボーナス', '明細', '振込'],
    category: '給与',
    response: {
      text: '給与明細は毎月 25 日に給与システムで公開されます。\n振込口座の変更は締切日の 10 日前までに人事部へご申請ください。',
      suggestions: ['給与明細を確認', '口座変更を申請', '給与体系について確認'],
    },
  },
  {
    keywords: ['経費', '領収書', '精算', '交通費', '出張'],
    category: '経費',
    response: {
      text: '経費精算は経費管理システムに領収書画像を添付して申請してください。\n申請締切は毎月末日、支払いは翌月 15 日です。',
      suggestions: ['経費申請をする', '精算ルールを確認', '出張申請フォーム'],
    },
  },
];

const categoryDefaults: Record<Category, BotResponse> = {
  IT: {
    text: 'IT・システムに関するご質問ですね。具体的な内容を教えていただけますか？',
    suggestions: ['パスワードリセット', 'VPN接続', 'ソフトウェア申請'],
  },
  アカウント: {
    text: 'アカウント・権限に関するご質問ですね。詳しく教えていただけますか？',
    suggestions: ['アカウント申請', '権限変更', 'メール設定'],
  },
  リモート: {
    text: 'リモートワークに関するご質問ですね。何でもお聞きください。',
    suggestions: ['リモート申請', 'VPN設定', 'リモート規定確認'],
  },
  休暇: {
    text: '休暇に関するご質問ですね。詳しく教えていただけますか？',
    suggestions: ['有給申請', '残日数確認', '特別休暇'],
  },
  給与: {
    text: '給与に関するご質問ですね。詳しく教えていただけますか？',
    suggestions: ['明細確認', '口座変更', 'ボーナス時期'],
  },
  経費: {
    text: '経費に関するご質問ですね。詳しく教えていただけますか？',
    suggestions: ['経費申請', '交通費精算', '出張申請'],
  },
};

const fallback: BotResponse = {
  text: 'ご質問ありがとうございます。左のカテゴリを選ぶか、キーワードを入力してください。\n例: 「パスワード」「有給」「経費精算」など',
  suggestions: ['IT・システム', '給与について', '経費精算'],
};

export function getBotResponse(input: string, category: Category | null): BotResponse {
  const normalized = input.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return rule.response;
    }
  }

  if (category) return categoryDefaults[category];
  return fallback;
}

export const categories: Category[] = ['IT', 'アカウント', 'リモート', '休暇', '給与', '経費'];
