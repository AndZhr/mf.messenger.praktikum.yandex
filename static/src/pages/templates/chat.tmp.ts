export default `
<div class="chat-body__message-feed message-feed">
  {{#if slectedChat}}
  <div class="message-feed__header">
    <div class="message-feed__avatar chat-avatar">
      <div class="message-feed__avatar-img chat-avatar__img">
        <span>{{ chatFirstLetter }}</span>
      </div>
      <div class="message-feed__avatar-name chat-avatar__name">
        {{ chatName }}
      </div>
    </div>

    <div class="message-feed__header-menu" data-dropdown>
      <button class="icon icon-ellipsis-h-solid" data-dropdown-btn></button>

      <div class="message-feed__header-dropdown message-feed__tooltip" data-dropdown-body>
        <ul>
          <li>
            <button data-btn-action="add-user">
              <span class="icon icon-plus-circle-solid"></span>
              Добавить пользователя
            </button>
          </li>
          <li>
            <button data-btn-action="remove-user">
              <span class="icon icon-minus-circle-solid"></span>
              Удалить пользователя
            </button>
          </li>
          <li>
            <button data-btn-action="remove-chat">
              <span class="icon icon-trash-alt-solid"></span>
              Удалить чат
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="message-feed__main message-feed-main">
    <ul class="message-feed-main__container">

      {{#each messageList}}
        {{#if this.yourMessageFlag}}
        <li class="message-feed-main__row message-feed-main__row_right">
          <div class="message-feed__message-block">
            {{#if this.imageSrc}}
            <div class="message-feed__message-block-image">
              <img src="{{ this.imageSrc }}" alt="">
            </div>
            {{/if}}
            <div class="message-feed__message-block-text">{{ this.text }}</div>
            <div class="message-feed__message-block-time">
              <span>{{ this.time }}</span>
              {{#if deliveredFlag}}
              <span class="message-feed__message-block-status icon icon-angle-double-right-solid"></span>
              {{/if}}
            </div>
          </div>
        </li>
        {{else}}
        <li class="message-feed-main__row message-feed-main__row_left">
          <div class="message-feed__message-block">
            {{#if this.imageSrc}}
            <div class="message-feed__message-block-image">
              <img src="{{ this.imageSrc }}" alt="">
            </div>
            {{/if}}
            <div class="message-feed__message-block-text">{{ this.text }}</div>
            <div class="message-feed__message-block-time">
              <span>{{ this.time }}</span>
            </div>
          </div>
        </li>
        {{/if}}
      {{/each}}
    </ul>
  </div>

  <div class="message-feed__footer">
    <div class="message-feed__footer-menu" data-dropdown>
      <button class="icon icon-paperclip-solid" data-dropdown-btn></button>

      <div class="message-feed__footer-dropdown message-feed__tooltip" data-dropdown-body>
        <ul>
          <li>
            <button data-btn-action="send-photo">
              <span class="icon icon-images-solid"></span>
              Фото или Видео
            </button>
          </li>
          <li>
            <button data-btn-action="send-file">
              <span class="icon icon-file-solid"></span>
              Файл
            </button>
          </li>
          <!-- <li>
            <button data-btn-action="send-location">
              <span class="icon icon-map-marked-alt-solid"></span>
              Локация
            </button>
          </li> -->
        </ul>
      </div>
    </div>

    <form id="message-form" class="message-feed__footer-form">
      <textarea class="message-feed__footer-input" name="message" placeholder="Введите сообщение..."></textarea>
      <div data-component="submit-btn"></div>
    </form>
  </div>
  {{else}}
  <div class="chat-body__placeholder">
    <p>Выберите чат чтобы начать общение</p>
  </div>
  {{/if}}
</div>
`;
