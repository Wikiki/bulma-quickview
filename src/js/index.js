import EventEmitter from './events';
import defaultOptions from './defaultOptions';

const onQuickviewShowClick = Symbol('onQuickviewShowClick');
const onQuickviewDismissClick = Symbol('onQuickviewDismissClick');

export default class bulmaQuickview extends EventEmitter {
  constructor(selector, options = {}) {
    super();

    this.element =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
    // An invalid selector or non-DOM node has been provided.
    if (!this.element) {
      throw new Error('An invalid selector or non-DOM node has been provided.');
    }

    this._clickEvents = ['click'];
    /// Set default options and merge with instance defined
    this.options = {
      ...defaultOptions,
      ...options,
    };

    this[onQuickviewShowClick] = this[onQuickviewShowClick].bind(this);
    this[onQuickviewDismissClick] = this[onQuickviewDismissClick].bind(this);

    this.init();
  }

  /**
   * Initiate all DOM element
   * @method
   * @return {Array} Array of all Carousel instances
   */
  static attach(selector = '[data-show="quickview"]', options = {}) {
    let instances = new Array();

    const elements = document.querySelectorAll(selector);
    [].forEach.call(elements, (element) => {
      setTimeout(() => {
        instances.push(new bulmaQuickview(element, options));
      }, 100);
    });
    return instances;
  }

  /**
   * Initiate plugin
   * @method init
   * @return {void}
   */
  init() {
    this.quickview = document.getElementById(this.element.dataset['target']);
    this.dismissElements = document.querySelectorAll(
      '[data-dismiss="quickview"]',
    );

    this._bindEvents();

    this.emit('quickview:ready', {
      element: this.element,
      quickview: this.quickview,
    });
  }

  /**
   * Bind all events
   * @method _bindEvents
   * @return {void}
   */
  _bindEvents() {
    this._clickEvents.forEach((event) => {
      this.element.addEventListener(event, this[onQuickviewShowClick], false);
    });

    [].forEach.call(this.dismissElements, (dismissElement) => {
      this._clickEvents.forEach((event) => {
        dismissElement.addEventListener(
          event,
          this[onQuickviewDismissClick],
          false,
        );
      });
    });
  }

  [onQuickviewShowClick](e) {
    this.quickview.classList.toggle('is-active');
    this.quickview.classList.contains('is-active')
      ? (e.target.innerText = 'Hide quickview')
      : (e.target.innerText = 'Show quickview');
    this.emit('quickview:toggle', {
      element: this.element,
      quickview: this.quickview,
    });
  }

  [onQuickviewDismissClick](e) {
    this.quickview.classList.remove('is-active');

    this.emit('quickview:hide', {
      element: this.element,
      quickview: this.quickview,
    });
  }
}
