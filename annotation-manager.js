/**
 * This module manages events which are used to handle creation and  removal of annotation
 * objects.
 */
const AnnotationManager = (() => {
  const listeners = {};

  /**
   * Function which will be used to attach events
   * @param {string} event name of an event.
   * @param {function} callback callback function.
   */
  const on = (event, callback) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  };

  /**
   * Function which will be used to notify about some events
   * by calling callback functions which were attached using
   * 'on' method
   * @param {string} event name of an event.
   * @param {object} payload object of type fabric.Object.
   */
  const fire = (event, payload) => {
    if (listeners[event]) {
      listeners[event].forEach((listener) => {
        listener(payload);
      });
    }
  };

  return {
    fire,
    on,
  };
})();

export default AnnotationManager;
