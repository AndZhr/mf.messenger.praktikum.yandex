const passwordForm = document.getElementById('password-form');
const profileForm = document.getElementById('profile-form');

passwordForm.addEventListener('submit', event => {
  event.preventDefault();

  const fields = {
    oldPassword: event.target.elements['old_password'].value,
    newPassword: event.target.elements['new_password'].value,
    newPasswordConfirm: event.target.elements['new_password_confirm'].value
  };

  console.log(fields);
});

profileForm.addEventListener('submit', event => {
  event.preventDefault();

  const fields = {
    firstName: event.target.elements['first_name'].value,
    secondName: event.target.elements['second_name'].value,
    email: event.target.elements['email'].value,
    login: event.target.elements['login'].value,
    phone: event.target.elements['phone'].value,
    displayName: event.target.elements['display_name'].value
  };

  console.log(fields);
});
