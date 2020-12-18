/**
 * Component class for ActionsContainer.
 * @extends HTMLElement
 */
export default class ActionsContainer extends HTMLElement {
  /**
   * Initializes ActionsContainer component
   */
  constructor() {
    // calls constructor on the base class
    super();
    // sets overlay and viewer objects to null
    this.overlay = null;
    this.viewer = null;

    // array of different actions that will be added to the actions container
    this.actions = [
      'rect-action', 'draw-action', 'viewer-action', 'remove-action',
    ];

    // create a template and attach it to the component's shadow dom
    this.attachShadow({ mode: 'open' });
    const tmp = document.createElement('template');
    tmp.innerHTML = `
            <style>
                ul, h3 { 
                    padding: 10px; 
                    margin: 0px;
                }

                ul li{
                    list-style: none;
                    margin-bottom: 5px;
                }
            </style>

            <h3>Actions</h3>
            <ul class="actions-container"></ul>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Itearate over each action item from 'actions' array
   * and add action components to this container component.
   */
  connectedCallback() {
    this.shadowRoot.querySelector('ul').innerHTML = '';

    this.actions.forEach((tool) => {
      const li = document.createElement('li');
      const el = document.createElement(tool);
      el.overlay = this.getAttribute('overlay');
      el.viewer = this.getAttribute('viewer');
      li.appendChild(el);
      this.shadowRoot.querySelector('ul').appendChild(li);
    });
  }

  /**
   * Sets overlay and viewer objects on this component and all the child action components.
   * @param {object} overlay - FabricJS overlay object.
   * @param {object} viewer - OSD viewer instance.
   */
  setOverlayAndViewer(overlay, viewer) {
    this.overlay = overlay;
    this.viewer = viewer;
    this.actions.forEach((tool) => {
      this.shadowRoot.querySelector(tool).setOverlayAndViewer(this.overlay, this.viewer);
    });
  }
}
