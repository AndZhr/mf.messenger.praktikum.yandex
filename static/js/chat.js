const addUserForm = document.getElementById('add-user-form');
const messageForm = document.getElementById('message-form');

addUserForm.addEventListener('submit', event => {
  event.preventDefault();

  const fields = {
    login: event.target.elements['login'].value
  };

  console.log(fields);
});

messageForm.addEventListener('submit', event => {
  event.preventDefault();

  const fields = {
    message: event.target.elements['message'].value
  };

  console.log(fields);
});
