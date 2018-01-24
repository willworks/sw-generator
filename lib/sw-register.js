'use strict';

class Register {
  constructor() {
    this.navigator = window && window.navigator || {};
    this.userAgent = this.navigator && this.navigator.userAgent || null;
  }
  /**
   * @param {}
   * @returns { Boolean }
   * check if sw is available in current platform
   */
  available() {
    return window
           && 'serviceWorker' in this.navigator
           && window.fetch
           && (window.location.protocol === 'https:'
              || window.location.hostname === 'localhost'
              || window.location.hostname.indexOf('127.') === 0);
  }
  /**
   * @param {Object} options
   * options.disable 是否全局销毁全部sw
   * options.url sw url
   * options.scope sw作用域
   * options.ve sw版本号，用户清除siteFile的缓存
   */
  install(options) {
    this.options = options;
    if (!(this.options.url && this.options.scope && this.options.ve)) {
      console.warn('[serviceWorker register]: serviceWorker config is not available');
      return;
    }
    if (!this.available()) {
      console.warn('[serviceWorker register]: serviceWorker is not available in this platform or domain');
      return;
    }
    if (options.disable) {
      this.uninstall();
      return;
    }
    // just do it!
    // serviceWorker diff left to sw itself
    window.addEventListener('load', () => {
      this.navigator.serviceWorker
        .register(`${this.options.url}?ve=${this.options.ve}`, { scope: this.options.scope })
          /* eslint-disable no-unused-vars */
          .then(registration => {
            console.log('[serviceWorker register]: serviceWorker registered successfully');
          })
          .catch(err => {
            console.error('[serviceWorker register]: error occur when registering serviceWorker ', err);
          });
    });
  }
  /**
   * uninstall sw
   * no matter the scope
   */
  uninstall() {
    window.addEventListener('load', () => {
      this.navigator.serviceWorker
        .getRegistration()
          .then(registration => {
            if (registration) {
              registration && registration.unregister();
              console.log('[serviceWorker register]: serviceWorker unregistered successfully');
            }
          })
          .catch(err => {
            console.error('[serviceWorker register]: error occur when unregistering serviceWorker ', err);
          });
    });
  }
}

exports.swRegister = new Register();
