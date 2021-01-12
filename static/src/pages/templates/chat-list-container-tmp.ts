export default `
  {{#each chatsList}}
    <li id="{{ this.id }}" class="chat-list__item chat-list-item">
      <div class="chat-list-item__image">
        <span>{{ this.firstLetter }}</span>
      </div>
      <div class="chat-list-item__body">
        <div class="chat-list-item__title">
          <div class="chat-list-item__name">{{ this.title }}</div>
          <div class="chat-list-item__time">{{ this.time }}</div>
        </div>
        <div class="chat-list-item__text">
          <div class="chat-list-item__message">
            {{#if this.yourMessageFlag}}
              <span class="chat-list-item__message-you">Вы: </span>
            {{/if }}
            {{ this.message }}
          </div>
          {{#if this.notReadCount}}
            <div class="chat-list-item__count">{{ this.unreadCount }}</div>
          {{/if}}
        </div>
      </div>
    </li>
  {{/each}}

  <li id="add-chat" class="chat-list__item chat-list-item">
    <div class="chat-list-item__image">
      <span>+</span>
    </div>
    <div class="chat-list-item__body">
      <div class="chat-list-item__title">
        <div class="chat-list-item__name">Создать чат</div>
      </div>
    </div>
  </li>
`;
