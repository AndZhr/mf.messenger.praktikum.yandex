export {};

const container: HTMLElement | null = document.getElementById('error-500');
const pageTemplate: HTMLElement | null = document.getElementById('error-500-template');
const pageData = {
  title: '500',
  text: 'Что-то пошло не так, но мы уже разбираемся'
};

if (container && pageTemplate) {
  let template = Handlebars.compile(pageTemplate.innerHTML);
  container.innerHTML = template(pageData);
}
