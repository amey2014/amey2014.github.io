/**
 * Component class for enabling back OSD viewer interactions. This component will
 * create a button and on click of this button, OSD interactions are enabled again.
 * @extends HTMLElement
 */
export default class ViewerTool extends HTMLElement {
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
            <button id="viewer" type="button" title="Enable viewer interactions">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-aspect-ratio" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                    <path fill-rule="evenodd" d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"/>
                </svg>
            </button>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Handles click on Viewer button. On click of this button, we enable
   * OSD viewer interactions again and disable freehand drawing mode of
   * the canvas
   */
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.viewer.setMouseNavEnabled(true);
      this.viewer.outerTracker.setTracking(true);
      // Disable freedrawing mode
      this.overlay.fabricCanvas().isDrawingMode = false;
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
