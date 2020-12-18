/* global fabric */

/**
 * Component class drawing rectangle action. This component will create a button and on click
 * of this button, a rectangle will be added to the canvas
 * @extends HTMLElement
 */
export default class RectAction extends HTMLElement {
  constructor() {
    super();
    this.overlay = null;
    this.overlay = null;
    this.attachShadow({ mode: 'open' });
    // create a template and attach it to the component's shadow dom
    const tmp = document.createElement('template');
    tmp.innerHTML = `
            <style>
                button{
                    padding: 10px;
                    background-color: transparent;
                    border: 1px solid;
                    border-radius: 7px;
                }
            </style>
            <button id="rect" type="button" title="Add a rectangle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
            </button>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Handles click on draw rectangle button. On click of this button, we create a Rect objcet
   * and adds it to the canvas object
   */
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: 'red',
        width: 200,
        height: 200,
        selectable: true,
      });

      // this.overlay.fabricCanvas().selection = false;
      this.overlay.fabricCanvas().isDrawingMode = false;
      this.overlay.fabricCanvas().add(rect);
      this.overlay.render();
    });
  }

  /**
   * Sets overlay and viewer objects on this component.
   * @param {object} overlay - FabricJS overlay object.
   * @param {object} viewer - OSD viewer instance.
   */
  setOverlayAndViewer(overlay, viewer) {
    this.overlay = overlay;
    this.viewer = viewer;
  }
}
