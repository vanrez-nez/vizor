export default class Uniform {
  constructor(rawUniform, values, key) {
    this.raw = rawUniform;
    this.values = values;
    this.key = key;
    this.textureUnit = -1;
  }

  update() {
    const { value, raw, textureUnit } = this;
    if (value !== undefined) {
      if (raw.isSampler && textureUnit > -1) {
        value.update(textureUnit);
        raw.value = textureUnit;
      } else {
        raw.value = value;
      }
    }
    raw.update();
  }

  get value() {
    return this.values[this.key];
  }

  set value(val) {
    this.values[this.key] = val;
  }

  get isTexture() {
    const { raw, value } = this;
    return raw.isSampler && value !== undefined && value.isTexture;
  }
}