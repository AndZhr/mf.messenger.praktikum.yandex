export default `
  <div class="chat-popup__box">
    <h3 class="chat-title">{{ title }}</h3>
    <div class="chat-input chat-file-input">
      <label for="file-input">{{ label }}</label>
      <input id="file-input" type="file">
    </div>
    <div class="chat-popup__btn">
      <button class="chat-main-btn" type="submit">{{ btnText }}</button>
    </div>
    <div class="chat-btn-invalid">Необходимо выбрать файл</div>
  </div>
`;
