export class StorageService {
  private data = {};
  private supportStorage = typeof Storage !== 'undefined';

  /**
   * Returns a value by key
   */
  get(key: string) {
    if (this.data[key]) {
      return this.data[key];
    }
    if (this.supportStorage) {
      return this.data[key] = JSON.parse(localStorage.getItem(key));
    }
    return null;
  }

  /**
   * Stores a key-value par
   */
  set(key: string, value) {
    this.data[key] = value;
    if (this.supportStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Removes a value by key
   */
  remove(key: string) {
    delete this.data[key];
    if (this.supportStorage) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Checks if a key is stored
   */
  contains(key: string): boolean {
    if (this.data[key]) {
      return true;
    }
    if (this.supportStorage) {
      return !!localStorage.getItem(key);
    }
    return false;
  }

}