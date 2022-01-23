function StorageProperty(key) {
  this.key = key;
}

StorageProperty.prototype.value = function() {
  return localStorage.getItem(this.key);
}

StorageProperty.prototype.set = function(value) {
  localStorage.setItem(this.key, value);
}

StorageProperty.prototype.clear = function() {
  localStorage.removeItem(this.key);
}

class Storage {
  constructor() {
    this.accessToken = new StorageProperty('access_token');
  }
}

export default new Storage;
