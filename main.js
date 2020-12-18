import AnnotationManager from './annotation-manager.js';
import {
  ActionsContainer,
  AnnotationContainer,
  AnnotationItem,
  RectAction,
  DrawAction,
  ViewerAction,
  RemoveAction,
  ColorPallete,
} from './components/index.js';

/* global OpenSeadragon */

(function (OpenSeadragon) {
  let viewer = null;
  let overlay = null;
  let canvas = null;

  const registerCustomElements = () => {
    customElements.define('annotations-container', AnnotationContainer);
    customElements.define('annotation-item', AnnotationItem);
    customElements.define('actions-container', ActionsContainer);
    customElements.define('rect-action', RectAction);
    customElements.define('draw-action', DrawAction);
    customElements.define('remove-action', RemoveAction);
    customElements.define('viewer-action', ViewerAction);
    customElements.define('color-pallete', ColorPallete);
  };

  /**
   * Helper function to add image to the OSD viewer
   * @param {string} url image url
   */
  const loadImageIntoOSDViewer = (url) => {
    viewer.addSimpleImage({
      type: 'image',
      url,
      buildPyramid: false,
    });
  };

  /**
   * Loads images into the list of images below the OSD viewer
   * @param {string} url image url
   */
  const loadImagesInTheList = () => {
    const images = [
      {
        id: 1,
        url: './images/image1.jpg',
      },
      {
        id: 2,
        url: './images/image2.jpg',
      },
      {
        id: 2,
        url: './images/image3.jpg',
      },
    ];

    images.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.url;
      img.id = image.id;
      img.onclick = () => loadImageIntoOSDViewer(image.url);
      document.querySelector('.imageList').appendChild(img);
    });

    document.querySelectorAll('.imageList img')[1].click();
  };

  /**
   * Toggles OSD view interaction.
   * @param {boolean} flag If true, interactions will be enabled, otherwise disabled
   */
  const toggleViewerInteractions = (flag) => {
    viewer.setMouseNavEnabled(flag);
    viewer.outerTracker.setTracking(flag);
  };

  /**
   * Disables OSD view interaction.
   * @param {object} e event object
   */
  const disableViewerInteractions = (e) => {
    if (e.target) {
      toggleViewerInteractions(false);
    }
  };

  /**
   * Attaches event handler to the canvas object.
   * @param {object} e event object
   */
  const attachEventHandlers = () => {
    canvas.on('mouse:over', disableViewerInteractions);

    canvas.on('mouse:down', disableViewerInteractions);

    canvas.on('mouse:out', (e) => {
      if (e.target && !canvas.isDrawingMode) {
        if (canvas.getActiveObjects().length === 0) {
          toggleViewerInteractions(true);
        }
      }
    });

    canvas.on('selection:cleared', () => {
      toggleViewerInteractions(true);
    });

    AnnotationManager.on('annotation-item:selected', (id) => {
      if (!id) return;
      canvas.forEachObject((obj, i) => {
        if (obj.id === id) {
          canvas.setActiveObject(canvas.item(i));
          canvas.renderAll();
        }
      });
    });
  };

  /**
   * Registers custom elements, creates OSD viewer, loads all images in the list
   * and set overlay and viewer objects on all child components
   * @param {object} e event object
   */
  const init = () => {
    registerCustomElements();

    // initializes OSD viewer
    viewer = OpenSeadragon({
      showNavigator: true,
      id: 'osdAlbumViewer',
      prefixUrl: './vendor/openseadragon/images/',
      maxZoomLevel: 10,
    });

    // loads all images to the bottom list
    loadImagesInTheList();

    overlay = viewer.fabricjsOverlay({ scale: 1000 });
    canvas = overlay.fabricCanvas();

    document.querySelector('actions-container')
      .setOverlayAndViewer(overlay, viewer);

    document.querySelector('color-pallete')
      .setOverlayAndViewer(overlay, viewer);

    document.querySelector('annotations-container')
      .setOverlayAndViewer(overlay, viewer);

    attachEventHandlers();
  };

  init();
}(OpenSeadragon));
