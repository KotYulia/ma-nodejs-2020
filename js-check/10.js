class Storage {
  constructor(name, diameter) {
    this.storage = new Object();
  }

  list() {
    return new Promise((resolve, reject) => {
      const listKeys = Object.keys(this.storage);
      if (!listKeys) {
        reject(new Error("Storage is empty"));
        return;
      }
      resolve(listKeys);
    });
  }

  fetch(key) {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject(new Error(`${key} is empty`));
        return;
      }
      const dataValue = this.storage[key];
      resolve(dataValue);
    });
  }

  store(key, data) {
    return new Promise((resolve, reject) => {
      if (!key || !data) {
        reject(new Error(`Data of ${key} is empty or ${key} is not exist`));
        return;
      }
      this.storage[key] = data;
      resolve(this.storage);
    });
  }

  destroy(key) {
    return new Promise((resolve, reject) => {
      if(!key) {
        reject(new Error("This key isn't exist"));
        return;
      }
      delete this.storage[key];
      resolve(this.list());
    });
  }

  storeList(params) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(params) === false) {
        reject(new Error("It isn't array"));
        return;
      }
      params.forEach((item) => this.store(item.key,item.data).then((res) => resolve(res)));
    });
  }

  destroyStartedWith(beginningOfKey) {
    return new Promise((resolve, reject) => {
      if (!beginningOfKey) {
        reject(new Error("Parameter is empty"));
        return;
      }
      const reg = new RegExp(`^${beginningOfKey}`, 'gi');
      this.list().then((res) => {
        res.forEach((item) => {
          if (reg.test(item) === true) {
            this.destroy(item).then();
            resolve('Done');
          }
        });
      });
    });
  }

  fetchInTimeOrFail(key, timeout) {
    return new Promise((resolve, reject) => {
      if (key && timeout) {
        this.fetch(key).then((res) => resolve(res));
        setTimeout(() => {
          reject(new Error("Search time out"));
        }, timeout);
      }
    });
  }
}

let newStorage = new Storage();
newStorage.store("key1", "data1").then((res) => console.log(res)).catch((error) => console.log(error));
newStorage.store("key2", "data2").then((res) => console.log(res)).catch((error) => console.log(error));
newStorage.list().then((res) => console.log(res)).catch((error) => console.log(error));
newStorage.fetch("key2").then((res) => console.log(res)).catch((error) => console.log(error));
newStorage.fetchInTimeOrFail("key1", 100).then((res) => console.log(res)).catch((error) => console.log(error));
newStorage.storeList([{key: "key11", data: "data11"}, {key: "key22", data: "data22"}]).then((res) => console.log(res)).catch((error) => console.log(error));
newStorage.destroy("key2").then((res) => console.log(res)).catch((error) => console.log(error));
newStorage.destroyStartedWith('key').then((res) => console.log(res)).catch((error) => console.log(error));