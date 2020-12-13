type formData = {
  formValid: {[key: string]: boolean};
  inputsRegexp: {[key: string]: RegExp};
}

export function inputsValidate(event: Event, formData: formData, formElem: HTMLFormElement | null): boolean {
  if (!event || !event.type || !formElem) return false;

  if (event.type === 'blur') {
    let input: EventTarget | null = event.target;

    if (!isInputElement(input)) return false;

    if (input.name) {
      formData.formValid[input.name] = formData.inputsRegexp[input.name].test(input.value);

      let invalidDiv: HTMLDivElement | null = document.querySelector(`[data-input-name=${input.name}]`);

      if (invalidDiv) {
        invalidDiv.classList.toggle('hidden', formData.formValid[input.name]);
      }

    }
  } else if (event.type === 'submit') {
    let inputs: NodeListOf<HTMLInputElement> = formElem.querySelectorAll('input');

    for (let input of inputs) {
      formData.formValid[input.name] = formData.inputsRegexp[input.name].test(input.value);

      let invalidDiv: HTMLDivElement | null = document.querySelector(`[data-input-name=${input.name}]`);

      if (invalidDiv) {
        invalidDiv.classList.toggle('hidden', formData.formValid[input.name]);
      }

    }
  }

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
