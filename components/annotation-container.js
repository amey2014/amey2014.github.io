import AnnotationManager from '../annotation-manager.js';
/* global fabric */

/**
 * Component class for AnnotationsContainer. THis component will
 * hold annotations that are added tp the canvas
 * @extends HTMLElement
 */
export default class AnnotationsContainer extends HTMLElement {
  constructor() {
    super();
    this.overlay = null;
    this.overlay = null;
    this.attachShadow({ mode: 'open' });

    // create a template and attach it to the component's shadow dom
    const tmp = document.createElement('template');
    tmp.innerHTML = `
            <style>
                section {
                    padding: 10px;
                    margin: 0px;
                }

                ul {
                    padding: 0px;
                }
                ul li{
                    list-style: none;
                    padding: 8px;
                    border-top: 1px solid #ccc9c9;
                }

                ul li:hover {
                    background-color: #ccc9c9;
                    cursor: pointer;
                }

                .empty-message {
                    display: none;
                }
            </style>

            <section class="annotations-container">
                <h3>Objects</h3>
                <span class="empty-message">None added!</span>
                <ul class="annotations-list"></ul>
                <button class="remove">Remove all</button>
            </section>
        `;
    this.shadowRoot.append(tmp.content.cloneNode(true));
  }

  /**
   * Attaches click handler to annotations list (ul) and remove button
   * @param {string} id - unique id of the annotation
   */
  connectedCallback() {
    this.shadowRoot.querySelector('.empty-message').style.display = 'inline';
    this.shadowRoot.querySelector('button.remove').style.visibility = 'hidden';

    // handles click on annotations list and fires annotation-item:selected event
    this.shadowRoot.querySelector('ul').addEventListener('click', (e) => {
      AnnotationManager.fire('annotation-item:selected', e.target.getAttribute('id'));
    });

    // handles click on Remove All button to remove all the annotations from the canvas
    // object and clear them from annotation list.
    this.shadowRoot.querySelector('button.remove').addEventListener('click', () => {
      this.overlay.fabricCanvas().clear();
      this.shadowRoot.querySelector('ul.annotations-list').innerHTML = '';
      this.shadowRoot.querySelector('.empty-message').style.display = 'inline';
      this.shadowRoot.querySelector('button.remove').style.visibility = 'hidden';
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

    // attach events on fabricCanvas object
    this.attachEventsOnFabricCanvas();
  }

  /**
   * Attach object:added and object;removed events on fabricCanvas objcet
   */
  attachEventsOnFabricCanvas() {
    this.overlay.fabricCanvas().on('object:removed', (e) => {
      this.removeAnnotationItem(e.target);
    });

    this.overlay.fabricCanvas().on('object:added', (e) => {
      e.target.id = `${e.target.type}_${fabric.Object.__uid++}`;
      this.createAnnotationItem(e.target);
    });
  }

  /**
   * creates annotation item and adds it to the annotation container list (ul)
   * @param {string} id - unique id for annotation item
   */
  createAnnotationItem({ id }) {
    const li = document.createElement('li');
    li.setAttribute('id', `${id}`);
    const annotationItem = document.createElement('annotation-item');
    annotationItem.setAttribute('id', `${id}`);

    li.appendChild(annotationItem);
    this.shadowRoot.querySelector('ul.annotations-list').appendChild(li);

    this.displayMessageIfNoAnnotations();
  }

  /**
   * removes annotation item from container (ul)
   * @param {string} id - unique id of the annotation
   */
  removeAnnotationItem({ id }) {
    this.shadowRoot.querySelector(`annotation-item#${id}`).parentElement.remove();

    this.displayMessageIfNoAnnotations();
  }

  /**
   * Hide/display message based on the annotation list. It also hides the 'Remove' button.
   */
  displayMessageIfNoAnnotations() {
    if (this.shadowRoot.querySelectorAll('annotation-item').length === 0) {
      this.shadowRoot.querySelector('button.remove').style.visibility = 'hidden';
      this.shadowRoot.querySelector('.empty-message').style.display = 'inline';
    } else {
      this.shadowRoot.querySelector('.empty-message').style.display = 'none';
      this.shadowRoot.querySelector('button.remove').style.visibility = 'visible';
    }
  }
}
