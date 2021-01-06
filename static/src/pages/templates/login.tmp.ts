export default `
<div class="chat-auth">
  <div class="chat-auth__container tile-block">
    <h3 class="chat-title">Вход</h3>
    <form id="login-form">

      <div class="chat-form__column">
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Логин</label>
          <input class="chat-input__input" type="text" name="login">
          <div class="chat-input__invalid hidden" data-input-name="login">Укажите логин</div>
        </div>
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Пароль</label>
          <input class="chat-input__input" type="password" name="password">
          <div class="chat-input__invalid hidden" data-input-name="password">Укажите пароль</div>
        </div>
        <div data-component="submit-btn" class="chat-form__btn"></div>
        <div class="chat-auth__form-link">
          <a class="chat-link" href="#" data-link="/register">Регистрация</a>
        </div>
      </div>

    </form>
  </div>
</div>
`;
