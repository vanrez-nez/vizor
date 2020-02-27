export default class Uniform {
  constructor(rawUniform, value) {
    this.raw = rawUniform;
    this.value = value;
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

  get isTexture() {
    const { raw, value } = this;
    return raw.isSampler && value !== undefined && value.isTexture;
  }
}