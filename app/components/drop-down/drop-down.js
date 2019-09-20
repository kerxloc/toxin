function getHtmlElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.classList.add(className);
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

class DropDown {
  constructor(options) {
    if (options.container) {
      this.container = options.container;
    } else {
      console.error('Expected container(node) inside constructor object but not received');
    }

    if (options.input) {
      this.input = options.input;
    } else {
      console.error('Expected input(node) inside constructor object but not received');
    }
  }

  init = () => {
    const dropDownHtml = getHtmlElement('section', 'drop-down', 'Hello world!');
    this.container.appendChild(dropDownHtml);
  };
}

export default DropDown;
