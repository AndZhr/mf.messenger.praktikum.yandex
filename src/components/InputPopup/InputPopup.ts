export default `
  <div class="chat-popup__box">
    <h3 class="chat-title">{{ title }}</h3>
    <form data-action-type="{{ action }}">
      <div class="chat-input">
        <label class="chat-input__label">{{ label }}</label>
        <input class="chat-input__input" type="text" name="login">
        <div class="chat-input__invalid" hidden>{{ invalidText }}</div>
      </div>
      <div class="chat-popup__btn">
        <button class="chat-main-btn" type="submit">{{ btnText }}</button>
      </div>
    </form>
  </div>
`;
