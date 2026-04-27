# 開発実行プロンプト

- developブランチで作業する
- 作業場所は `C:\Users\あなたのユーザー名\Documents\任意のフォルダ名` にする

## 実装内容

TypeScript + Vite + React で AIチャット風社内サポートUI を作成する。

## 要件

- 左サイドバーにカテゴリ一覧（IT/アカウント/リモート/休暇/給与/経費）
- チャット画面にボット返答・タイピングアニメーション
- サジェストチップとテキスト入力欄
- キーワードベースのボット自動応答
- 白基調のライトデザイン

## 完成後

- ローカルでビルドして動作確認
- developをpushして main向けのPRをghで作成
- `.github/workflows/deploy.yml` を作成
- mainブランチにpushされたらGitHub Pagesに自動デプロイ
- `vite.config.ts` の `base` はリポジトリ名に合わせて設定
