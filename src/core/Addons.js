import { warn } from "../utils/LogUtils";

const ASet = new Map();
export default class Addons {

  static Register(jsclass) {
    const key = jsclass.GetKey();
    if (ASet.has(key)) {
      warn('Addon already registered: ', key);
      return false;
    }
    const instance = new jsclass();
    ASet.set(key, instance);
  }

  static Get(key) {
    return ASet.get(key);
  }
}