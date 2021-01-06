export default `
<div class="chat-list__header">
  <div class="chat-list__profile-link">
    <a class="chat-link" href="#" data-link="/profile">Профиль</a>
  </div>
  <div class="chat-list-search">
    <span class="chat-list-search__icon icon icon-search-solid"></span>
    <input class="chat-list-search__input" id="chat-list-search" type="text" placeholder="Поиск">
  </div>
</div>

<div id="chat-list-container" class="chat-list__body">
  <ul id="chat-list" class="chat-list__list">

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
              <div class="chat-list-item__count">{{ this.notReadCount }}</div>
            {{/if}}
          </div>
        </div>
      </li>
    {{/each}}

  </ul>
</div>
`;
