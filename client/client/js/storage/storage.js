/**
 * Created by horacio on 07/09/2016.
 */

export default class Storage {
  constructor() {
    this.cache = {};
    this.available = window.localstorage;
  }

  isAvailable() {
    return this.available;
  }

  // devuelve los valores defaults cambiando a (o sumandole) los que esten el storage
  getItem(key, defaultValue) {
    let userData;
    if (!this.cache.hasOwnProperty(key) && this.available) {
      if (localStorage[key]) {
        this.cache[key] = JSON.parse(localStorage[key]);
        userData = this.cache[key];
      }
    }
    return {...defaultValue, ...userData};
  }

  setItem(key, value) {
    value = value || {};
    this.cache[key] = {...value};
    if (this.available) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log('localStorage is full', e);
      }
    }
  }

  removeItem(key) {
    if (this.cache.hasOwnProperty(key))
      delete this.cache[key];
    if (this.available) {
      localStorage.removeItem(key);
    }
  }

}
