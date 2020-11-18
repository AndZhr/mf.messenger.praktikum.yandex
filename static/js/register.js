const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', logFormFields);

function logFormFields(event) {
  event.preventDefault();

  const fields = {
    email: event.target.elements['email'].value,
    login: event.target.elements['login'].value,
    firstName: event.target.elements['first_name'].value,
    secondName: event.target.elements['second_name'].value,
    phone: event.target.elements['phone'].value,
    password: event.target.elements['password'].value,
    passwordConfirm: event.target.elements['password_confirm'].value
  };

  console.log(fields);
}
