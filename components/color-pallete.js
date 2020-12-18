/**
 * Component class for color pallete. This component will display available color options
 * for the annotation objects.
 * @extends HTMLElement
 */
export default class ColorPallete extends HTMLElement {
  constructor() {
    super();
    this.overlay = null;
    this.overlay = null;
    this.attachShadow({ mode: 'open' });

    // create a template and attach it to the component's shadow dom
    const tmp = document.createElement('template');
    tmp.innerHTML = `
            <style>
                .color-pallete {
                    display: grid;
                    grid-template-columns: 25px 25px;;
                    gap: 10px;
                    padding: 10px;
                }
                .color-pallete button {
                    padding: 10px;
                    width: 20px
                }
                .color-pallete button.red {
                    background-color: #ff0000;
                }
                .color-pallete button.blue {
                    background-color: #0000ff;
                }
                .color-pallete button.green {
                    background-color: #00ff00;
                }
                .color-pallete button.yellow {
                    background-color: #ffff00;
                }
            </style>
            <div class="color-pallete">
                <button class="red" data-color="#ff0000"></button>
                <button class="blue" data-color="#0000ff"></button>
                <button class="green" data-color="#00ff00"></button>
                <button class="yellow" data-color="#ffff00"></button>
            </div>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Handles click event on color pallete elements. On click, if thetarget is a button, then
   * we use color attribute of that button to set the active objects fill property
   */
  connectedCallback() {
    this.shadowRoot.querySelector('.color-pallete').addEventListener('click', (e) => {
      if (e.target instanceof HTMLButtonElement) {
        const color = e.target.getAttribute('data-color');
        const activeObject = this.overlay.fabricCanvas().getActiveObject();
        if (activeObject) {
          activeObject.set({ fill: color });
          this.overlay.render();
        }
      }
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
