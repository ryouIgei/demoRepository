import type { CategoryId } from '../types'

export interface BotRule {
  keywords: string[]
  response: string
}

export const categoryRules: Record<CategoryId, BotRule[]> = {
  it: [
    {
      keywords: ['パスワード', 'ログイン', 'password'],
      response: 'パスワードのリセットはIT管理ポータル（portal.company.com）からセルフサービスで行えます。問題が続く場合は it-support@company.com までご連絡ください。',
    },
    {
      keywords: ['vpn', 'VPN', '接続'],
      response: 'VPNの接続方法：①社内ポータルからVPNクライアントをインストール ②社員IDとパスワードで認証 ③接続先は「JP-Office」を選択してください。',
    },
    {
      keywords: ['pc', 'PC', 'パソコン', '故障', '動かない'],
      response: 'PCのトラブルはまず再起動をお試しください。解決しない場合はITヘルプデスク（内線: 1234）またはチケットシステムでご申請ください。',
    },
    {
      keywords: ['メール', 'mail', 'outlook'],
      response: 'メール設定のサポートが必要ですか？Outlookの設定ガイドは社内ポータル > IT > メールセットアップ にあります。',
    },
  ],
  account: [
    {
      keywords: ['アカウント', '作成', '新規'],
      response: '新規アカウントの作成は所属部門の管理者から申請が必要です。申請フォームは社内ポータル > アカウント管理 からアクセスできます。',
    },
    {
      keywords: ['権限', 'アクセス', '許可'],
      response: 'システムアクセス権限の変更は上長の承認が必要です。承認後、ITチームが3営業日以内に対応します。',
    },
    {
      keywords: ['ロック', 'ロックアウト', 'locked'],
      response: 'アカウントがロックされた場合、ITヘルプデスク（内線: 1234）に連絡するか、セルフサービスポータルからロック解除を試みてください。',
    },
  ],
  remote: [
    {
      keywords: ['リモート', 'テレワーク', '在宅', '申請'],
      response: 'リモートワークの申請は就業管理システムから前日17時までに申請してください。週3日まで利用可能です。',
    },
    {
      keywords: ['環境', 'セットアップ', '機器'],
      response: 'リモートワーク用機器（モニター・キーボード等）の貸し出しは総務部に申請できます。申請フォームは社内ポータル > 総務 > 機器貸出 にあります。',
    },
    {
      keywords: ['zoom', 'Zoom', 'teams', 'Teams', 'web会議'],
      response: 'Web会議ツールはZoom（社内ライセンス）とMicrosoft Teamsが利用可能です。アカウントはIT管理ポータルから有効化できます。',
    },
  ],
  leave: [
    {
      keywords: ['有給', '休暇', '申請'],
      response: '有給休暇の申請は就業管理システムから行ってください。取得希望日の3営業日前までに申請し、上長の承認を得る必要があります。',
    },
    {
      keywords: ['残日数', '残り', '何日'],
      response: '有給残日数は就業管理システムのマイページ > 休暇管理 から確認できます。毎月1日に更新されます。',
    },
    {
      keywords: ['特別休暇', '慶弔', '病気'],
      response: '特別休暇（慶弔・病気等）については就業規則第10条をご確認ください。申請には証明書類が必要な場合があります。',
    },
    {
      keywords: ['育休', '産休', '育児'],
      response: '育児・産前産後休業の手続きは人事部（hr@company.com）にご相談ください。取得予定の3ヶ月前にご連絡いただくとスムーズです。',
    },
  ],
  salary: [
    {
      keywords: ['給与', '給料', '明細'],
      response: '給与明細は毎月25日に給与管理システム（payroll.company.com）で確認できます。PDF形式でダウンロードも可能です。',
    },
    {
      keywords: ['振込', '口座', '変更'],
      response: '給与振込口座の変更は毎月15日までに人事部へ申請が必要です。変更申請フォームは社内ポータル > 人事 > 口座変更 にあります。',
    },
    {
      keywords: ['残業', '時間外', '手当'],
      response: '残業代は翌月の給与に加算されます。残業申請は就業管理システムから当日中に申請してください。未申請の残業は支払い対象外となります。',
    },
    {
      keywords: ['賞与', 'ボーナス'],
      response: '賞与は年2回（6月・12月）支給予定です。支給額は人事評価と業績に基づいて決定されます。詳細は人事部にお問い合わせください。',
    },
  ],
  expense: [
    {
      keywords: ['経費', '申請', '精算'],
      response: '経費精算は経費管理システム（expense.company.com）から申請してください。領収書は電子データ（PDF/JPEG）で添付が必要です。',
    },
    {
      keywords: ['領収書', 'レシート'],
      response: '領収書は必ず宛名を「会社名」で取得してください。個人名の領収書は経費として認められません。電子化して3年間保管が必要です。',
    },
    {
      keywords: ['交通費', '出張', '移動'],
      response: '交通費は経費管理システムから申請できます。新幹線・飛行機利用の場合は事前申請が必要です。タクシーは深夜（22時以降）または公共交通機関が利用できない場合に限り利用可能です。',
    },
    {
      keywords: ['接待', '会食', '食事'],
      response: '接待・会食の経費は1人あたり10,000円を上限とし、事前に上長の承認が必要です。参加者名簿と目的を記載してください。',
    },
  ],
}

export const suggestChips: Record<CategoryId, string[]> = {
  it: ['パスワードをリセットしたい', 'VPNに接続できない', 'PCが故障した', 'メールが使えない'],
  account: ['新規アカウントを作成したい', 'アクセス権限を変更したい', 'アカウントがロックされた'],
  remote: ['リモートワークを申請したい', 'リモート環境を整えたい', 'Web会議ツールを使いたい'],
  leave: ['有給休暇を申請したい', '残日数を確認したい', '特別休暇について知りたい', '育休を取りたい'],
  salary: ['給与明細を確認したい', '口座を変更したい', '残業代について知りたい', '賞与の時期を知りたい'],
  expense: ['経費を精算したい', '領収書の書き方を知りたい', '交通費を申請したい', '接待費について知りたい'],
}

export const categoryWelcome: Record<CategoryId, string> = {
  it: 'ITサポートへようこそ。パスワード、VPN、PC障害など、IT関連のご質問にお答えします。',
  account: 'アカウント管理サポートへようこそ。アカウントの作成・権限変更・ロック解除などをサポートします。',
  remote: 'リモートワークサポートへようこそ。在宅勤務の申請・環境整備・Web会議ツールについてご案内します。',
  leave: '休暇サポートへようこそ。有給休暇・特別休暇・育休など、各種休暇の申請方法をご案内します。',
  salary: '給与サポートへようこそ。給与明細の確認・口座変更・残業代・賞与についてご案内します。',
  expense: '経費サポートへようこそ。経費精算・領収書・交通費・接待費についてご案内します。',
}

export function getBotResponse(categoryId: CategoryId, userText: string): string {
  const rules = categoryRules[categoryId]
  const lower = userText.toLowerCase()

  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return rule.response
    }
  }

  return `「${userText}」についてのご質問ありがとうございます。より詳しいサポートが必要な場合は、担当部署にお問い合わせください。他にご質問はありますか？`
}
