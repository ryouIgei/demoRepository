import "./style.css";

type Sender = "user" | "bot";

type ChatMessage = {
  sender: Sender;
  text: string;
  time: string;
};

const cannedResponses = [
  "確認しました。最短で解決できる手順を案内します。",
  "ありがとうございます。該当の設定をこちらで再確認します。",
  "状況を理解しました。次の1ステップだけ試してみましょう。",
  "承知しました。お客様の利用環境に合わせて提案します。"
];

const quickActions = ["配送状況を確認", "請求内容を確認", "プラン変更したい", "担当者につなぐ"];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりません。");
}

app.innerHTML = `
  <main class="shell">
    <section class="hero">
      <p class="eyebrow">CUSTOMER CARE CONSOLE</p>
      <h1>Support Orbit</h1>
      <p class="sub">AIが一次対応し、必要時は人へシームレスに引き継ぐカスタマーサポートUI</p>
    </section>

    <section class="chat-card" aria-label="チャット画面">
      <header class="chat-header">
        <div class="agent-dot" aria-hidden="true"></div>
        <div>
          <p class="agent-name">AI Support Assistant</p>
          <p class="agent-status">オンライン・平均応答 12秒</p>
        </div>
      </header>

      <div class="quick-actions" id="quickActions"></div>

      <div class="timeline" id="timeline" aria-live="polite"></div>

      <form class="composer" id="composer">
        <label class="sr-only" for="message">問い合わせ内容</label>
        <input id="message" name="message" type="text" placeholder="メッセージを入力..." autocomplete="off" />
        <button type="submit">送信</button>
      </form>
    </section>
  </main>
`;

const timeline = document.querySelector<HTMLDivElement>("#timeline");
const composer = document.querySelector<HTMLFormElement>("#composer");
const messageInput = document.querySelector<HTMLInputElement>("#message");
const quickActionContainer = document.querySelector<HTMLDivElement>("#quickActions");

if (!timeline || !composer || !messageInput || !quickActionContainer) {
  throw new Error("チャットUIの初期化に失敗しました。");
}

const now = (): string => new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });

const renderMessage = (message: ChatMessage): void => {
  const row = document.createElement("article");
  row.className = `msg msg-${message.sender}`;

  row.innerHTML = `
    <p>${message.text}</p>
    <time>${message.time}</time>
  `;

  timeline.appendChild(row);
  timeline.scrollTop = timeline.scrollHeight;
};

const renderTyping = (): HTMLDivElement => {
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.innerHTML = '<span></span><span></span><span></span>';
  timeline.appendChild(typing);
  timeline.scrollTop = timeline.scrollHeight;
  return typing;
};

const addBotReply = (sourceText: string): void => {
  const typing = renderTyping();
  window.setTimeout(() => {
    typing.remove();
    const content = `${cannedResponses[Math.floor(Math.random() * cannedResponses.length)]}（受信: ${sourceText.slice(0, 16)}...）`;
    renderMessage({ sender: "bot", text: content, time: now() });
  }, 850);
};

quickActions.forEach((label) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = label;
  button.addEventListener("click", () => {
    renderMessage({ sender: "user", text: label, time: now() });
    addBotReply(label);
  });
  quickActionContainer.appendChild(button);
});

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = messageInput.value.trim();

  if (!value) {
    return;
  }

  renderMessage({ sender: "user", text: value, time: now() });
  addBotReply(value);
  composer.reset();
});

renderMessage({
  sender: "bot",
  text: "こんにちは。ご用件をお聞かせください。配送・請求・契約変更などをすぐにサポートします。",
  time: now()
});