import "./styles.css";
import Renderer from './Renderer';
import fragmentSource from './glsl/fragment-shader.glsl';
import vertexSource from './glsl/vertex-shader.glsl';
import Shader from './Shader';

class Demo {
  constructor() {
    this.renderer = new Renderer('js-canvas');
    this.renderer.resize(500, 500, true);
    this.shader = new Shader(this.renderer.gl, {vertexSource, fragmentSource});
    this.render();
  }

  render() {
    const { renderer } = this;
    renderer.clear();
    renderer.render();
  }
}

new Demo();
