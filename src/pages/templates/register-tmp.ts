export default `
<div class="chat-auth">
  <div class="chat-auth__container tile-block">
    <h3 class="chat-title">Регистрация</h3>
    <form id="register-form" class="chat-auth__form chat-form">

      <div class="chat-form__column">
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Почта</label>
          <input class="chat-input__input" type="text" name="email">
          <div class="chat-input__invalid hidden" data-input-name="email">Укажите почту</div>
        </div>
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Логин</label>
          <input class="chat-input__input" type="text" name="login">
          <div class="chat-input__invalid hidden" data-input-name="login">Укажите логин</div>
        </div>
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Имя</label>
          <input class="chat-input__input" type="text" name="first_name">
          <div class="chat-input__invalid hidden" data-input-name="first_name">Укажите имя</div>
        </div>
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Фамилия</label>
          <input class="chat-input__input" type="text" name="second_name">
          <div class="chat-input__invalid hidden" data-input-name="second_name">Укажите фамилию</div>
        </div>
      </div>

      <div class="chat-form__column">
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Телефон</label>
          <input class="chat-input__input" type="text" name="phone">
          <div class="chat-input__invalid hidden" data-input-name="phone">Укажите телефон</div>
        </div>
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Пароль</label>
          <input class="chat-input__input" type="password" name="password">
          <div class="chat-input__invalid hidden" data-input-name="password">Укажите пароль</div>
        </div>
        <div class="chat-auth__form-input chat-input">
          <label class="chat-input__label">Пароль (ещё раз)</label>
          <input class="chat-input__input" type="password" name="password_confirm">
          <div class="chat-input__invalid hidden" data-input-name="password_confirm">Укажите пароль, ещё раз</div>
        </div>
        <div data-component="submit-btn" class="chat-form__btn"></div>
        <div class="chat-auth__form-link">
          <a class="chat-link" href="#" data-link="/login">Вход</a>
        </div>
      </div>

    </form>
  </div>
</div>
`;
