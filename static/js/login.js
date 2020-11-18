const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', logFormFields);

function logFormFields(event) {
  event.preventDefault();

  const fields = {
    login: event.target.elements['login'].value,
    password: event.target.elements['password'].value
  };

  console.log(fields);
}
