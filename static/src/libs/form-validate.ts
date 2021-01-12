interface formData {
  formValid?: {[key: string]: boolean};
  [key: string]: any;
}

const regexpObj: {[key: string]: RegExp} = {
  email: /^\S+@\S+\.\S+$/,
  login: /^[a-z\_\-\.]{6,}$/i,
  'first_name': /^[a-zа-яё\-]+$/i,
  'second_name': /^[a-zа-яё\-]+$/i,
  phone: /^\+?(7|8)\d{10}$/,
  password: /^.{8,}$/,
  'password_confirm': /^.{8,}$/,
  'display_name': /^[a-zа-яё \-]+$/i,
  'old_password': /^.{8,}$/,
  'new_password': /^.{8,}$/,
  'new_password_confirm': /^.{8,}$/
};

export function inputsValidate(event: Event, formData: formData, formElem: HTMLFormElement | HTMLElement | null): boolean {
  if (!event || !event.type || !formElem) return false;

  if (event.type === 'blur') {
    let input: EventTarget | null = event.target;

    if (!isInputElement(input)) return false;

    if (input.name && input.name in regexpObj && formData.formValid) {
      formData.formValid[input.name] = regexpObj[input.name].test(input.value);

      let invalidDiv: HTMLDivElement | null = document.querySelector(`[data-input-name=${input.name}]`);

      if (invalidDiv) {
        invalidDiv.classList.toggle('hidden', formData.formValid[input.name]);
      }

    }
  } else if (event.type === 'submit') {
    let inputs: NodeListOf<HTMLInputElement> = formElem.querySelectorAll('input');

    for (let input of inputs) {
      if (!(input.name in regexpObj) || !formData.formValid) continue;

      formData.formValid[input.name] = regexpObj[input.name].test(input.value);

      let invalidDiv: HTMLDivElement | null = document.querySelector(`[data-input-name=${input.name}]`);

      if (invalidDiv) {
        invalidDiv.classList.toggle('hidden', formData.formValid[input.name]);
      }

    }
  }

  if (!formData.formValid) return false;

  let formIsValid: boolean = true;

  for (let isValid of Object.values(formData.formValid)) {
    if (!isValid) {
      formIsValid = isValid;
    }
  }

  return formIsValid;
}

function isInputElement(elem: EventTarget | null): elem is HTMLInputElement {
  if (!elem || !(elem instanceof HTMLInputElement)) return false;

  return (elem.tagName === 'INPUT');
}
