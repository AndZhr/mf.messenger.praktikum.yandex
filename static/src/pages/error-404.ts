export {};

const container: HTMLElement | null = document.getElementById('error-404');
const pageTemplate: HTMLElement | null = document.getElementById('error-404-template');
const pageData = {
  title: '404',
  text: 'Такой страницы не существует'
};

if (container && pageTemplate) {
  let template = Handlebars.compile(pageTemplate.innerHTML);
  container.innerHTML = template(pageData);
}
