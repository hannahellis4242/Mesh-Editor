import CanvasParams from "./Canvas/CanvasParams";
import canvasCoordsToSceneCoords from "./canvasCoordsToSceneCoords";
import Ray from "./Scene/Ray";
import Scene from "./Scene/Scene";
import { zeroVec } from "./Scene/Vector";

export default class RayTrace {
  constructor(private canvas: CanvasParams, private scene: Scene) {}
  createImage(context: CanvasRenderingContext2D) {
    const image = context.createImageData(
      this.canvas.width,
      this.canvas.height
    );
    const toSceenCoords = canvasCoordsToSceneCoords(this.canvas);
    let i = 0;
    for (let x = 0; x < this.canvas.width; ++x) {
      for (let y = 0; y < this.canvas.height; ++y) {
        const target = toSceenCoords({ x, y });
        const ray = new Ray(zeroVec(), target);
        const intersections = this.scene.intersections(ray);
        if (intersections.length > 0) {
          image.data[i] = 256;
          image.data[i + 1] = 256;
          image.data[i + 2] = 256;
          image.data[i + 3] = 256;
        } else {
          image.data[i] = 0;
          image.data[i + 1] = 0;
          image.data[i + 2] = 0;
          image.data[i + 3] = 256;
          i += 4;
        }
      }
    }
    return image;
  }
}
