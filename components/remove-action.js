/**
 * Component class for remove action. This component will create a button and on click
 * of this button, a selected annotation object from the canvas will be removed.
 * @extends HTMLElement
 */
export default class RemoveAction extends HTMLElement {
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
            <button id="clear" type="button" title="Remove selected object">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Handles click on Remove button. On click of this button, we remove the active object
   * from the canvas and enable OSD viewer interactions again.
   */
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.viewer.setMouseNavEnabled(true);
      this.viewer.outerTracker.setTracking(true);

      this.overlay.fabricCanvas().isDrawingMode = false;

      this.overlay.fabricCanvas().remove(this.overlay.fabricCanvas().getActiveObject());
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
