import Vec3 from '../math/Vec3';
import Mat3 from '../math/Mat3';
import Mat4 from '../math/Mat4';
import Euler from '../math/Euler';
import Quat from '../math/Quat';

const DefaultUp = new Vec3(0, 1, 0);

export default class Object3D {
  constructor() {
    this.matrix = new Mat3();
    this.worldMatrix = new Mat4();
    this.position = new Vec3();
    this.rotation = new Euler();
    this.quaternion = new Quat();
    this.scale = new Vec3(1, 1, 1);
    this.parent = null;
    this.children = [];
    this.visible = true;
    this.matrixAutoUpdate = true;
    this.matrixWorldNeedsUpdate = false;
    this.up = DefaultUp.clone();
    this.rotation.events.on('change', this.onRotationChange.bind(this));
    this.quaternion.events.on('change', this.onQuaternionChange.bind(this));
  }

  onRotationChange() {
    const { quaternion } = this;
    quaternion.events.pause();
    quaternion.fromEulerRotation(this.euler)
    quaternion.events.resume();
  }

  onQuaternionChange() {
    const { rotation } = this;
    rotation.events.pause();
    rotation.fromQuatRotation(this.quaternion);
    rotation.events.resume();
  }

  add(child) {
    const { children } = this;
    if (child && child !== this && children.indexOf(child) > -1) {
      if (child.parent) {
        child.parent.remove(child);
      }
      child.parent = this;
      children.push(child);
      child.events.emit('added');
    }
    return this;
  }

  remove(child) {
    const { children } = this;
    const idx = children.indexOf(child);
    if (idx > -1) {
      children.splice(idx, 1);
      child.events.emit('removed');
    }
    return this;
  }

  traverse(callback) {
    const { children } = this;
    if (callback(this)) return;
    for (let i = 0; i < children.length; i++) {
      children[i].traverse(callback);
    }
  }

  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = true;
  }

  updateMatrixWorld(force) {
    const { parent, children, matrix, worldMatrix } = this;
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (parent === null) {
        worldMatrix.copy(matrix);
      } else {
        worldMatrix.multiply(parent.worldMatrix, matrix);
        this.matrixWorldNeedsUpdate = false;
      }
      force = true;
    }

    for (let i = 0; i < children.length; i++) {
      children[i].updateMatrixWorld(force);
    }
  }

  lookAt(target, invert = false) {
    // does not support rotated parents
    const src = invert ? this.position : target;
    const dst = invert ? target : this.position;
    this.matrix.lookAt(src, dst, this.up);
    this.quaternion.fromMatrixRotation(this.matrix);
    this.rotation.fromQuatRotation(this.quaternion);
  }

}
