/**
 * Component class for each annotation item.
 * @extends HTMLElement
 */
export default class AnnotationItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // create a template and attach it to the component's shadow dom
    const tmp = document.createElement('template');
    tmp.innerHTML = `
            <span class="id"></span>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Sets innerText for this components span element
   */
  connectedCallback() {
    this.shadowRoot.querySelector('span.id').innerText = this.getAttribute('id');
  }
}
