class Storage {
  constructor(name, diameter) {
    this.storage = new Object();
  }

  list() {
    return new Promise((resolve, reject) => {
      Object.keys(this.storage) ?  resolve(console.log(Object.keys(this.storage))) : reject(console.log(new Error("Storage is empty")));
    });
  }

  fetch(key) {
    return new Promise((resolve, reject) => {
      this.storage[key] ? resolve(console.log(this.storage[key])) : reject(console.log(new Error(`Data of ${key} is empty`)));
    });
  }

  store(key, data) {
    return new Promise((resolve, reject) => {
      this.storage[key] = data;
      resolve(console.log(this.storage));
    });
  }

  destroy(key) {
    return new Promise((resolve, reject) => {
      if(this.storage[key]) {
        delete this.storage[key];
        resolve(console.log(this.storage));
      } else reject(new Error("This key isn't exist"));
    });
  }

  storeList([{key, data}]) {
    return new Promise((resolve, reject) => {
      [{key, data}] ? resolve(console.log([{key, data}].forEach(({key, data}) => this.store(key, data)))) : reject(new Error("Storage is empty"));
    });
  }

  fetchInTimeOrFail(key, timeout) {
    return new Promise(function(resolve, reject) {
      resolve(console.log(this.storage[key]));
      setTimeout(() => {
        reject(new Error("Search time out"));
      }, timeout);
    });
  }
}


const newStorage = new Storage();
newStorage.store("key1", "data1").then();
newStorage.store("key2", "data2").then();
newStorage.list().then();
newStorage.fetch("key2").then();
newStorage.fetchInTimeOrFail("key2", 100).then();
newStorage.storeList([{key: "key1", data: "data1"}, {key: "key2", data: "data2"}]).then();
newStorage.destroy("key1").then();