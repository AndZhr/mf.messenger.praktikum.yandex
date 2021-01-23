type formDataType = {
  formValid?: {[key: string]: boolean};
  [key: string]: unknown;
};

const regexpObj: {[key: string]: RegExp} = {
  email: /^\S+@\S+\.\S+$/,
  login: /^[a-z_\-.0-9]{4,}$/i,
  first_name: /^[a-zа-яё-]+$/i,
  second_name: /^[a-zа-яё-]+$/i,
  phone: /^\+?(7|8)\d{10}$/,
  password: /^.{6,}$/,
  password_confirm: /^.{6,}$/,
  display_name: /^[a-zа-яё -]+$/i,
  old_password: /^.{6,}$/,
  new_password: /^.{6,}$/,
  new_password_confirm: /^.{6,}$/
};

export function inputsValidate(
  event: Event,
  formData: formDataType,
  formElem: HTMLFormElement | HTMLElement | null
): boolean {
  if (!event || !event.type || !formElem) return false;

  if (event.type === 'blur') {
    const input: EventTarget | null = event.target;

    if (!isInputElement(input)) return false;

    if (input.name && input.name in regexpObj && formData.formValid) {
      // eslint-disable-next-line no-param-reassign
      formData.formValid[input.name] = regexpObj[input.name].test(input.value);

      const invalidDiv: HTMLDivElement | null = document.querySelector(`[data-input-name=${input.name}]`);

      if (invalidDiv) {
        invalidDiv.classList.toggle('hidden', formData.formValid[input.name]);
      }
    }
  } else if (event.type === 'submit') {
    const inputs: NodeListOf<HTMLInputElement> = formElem.querySelectorAll('input');

    inputs.forEach(input => {
      if (!(input.name in regexpObj) || !formData.formValid) return;

      // eslint-disable-next-line no-param-reassign
      formData.formValid[input.name] = regexpObj[input.name].test(input.value);

      const invalidDiv: HTMLDivElement | null = document.querySelector(`[data-input-name=${input.name}]`);

      if (invalidDiv) {
        invalidDiv.classList.toggle('hidden', formData.formValid[input.name]);
      }
    });
  }

  if (!formData.formValid) return false;

  let formIsValid = true;

  Object.values(formData.formValid).forEach(isValid => {
    if (!isValid) {
      formIsValid = isValid;
    }
  });

  return formIsValid;
}

function isInputElement(elem: EventTarget | null): elem is HTMLInputElement {
  if (!elem || !(elem instanceof HTMLInputElement)) return false;

  return (elem.tagName === 'INPUT');
}
