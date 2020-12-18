/**
 * Component class drawing freehand action. This component will create a button and on click
 * of this button, it will enable drawing on the canvas
 * @extends HTMLElement
 */
export default class DrawAction extends HTMLElement {
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
            <button id="draw" type="button" title="Freehand action">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
            </button>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Handles click on freehand drawing button. On click of this button, we disable OSD viewer
   * interactions and enable free hand drawing on the canvas object.
   */
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      // Disable OSD mousevents
      this.viewer.setMouseNavEnabled(false);
      this.viewer.outerTracker.setTracking(false);
      // Activate fabric freedrawing mode
      this.overlay.fabricCanvas().isDrawingMode = true;
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
