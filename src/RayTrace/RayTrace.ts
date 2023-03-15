import CanvasParams from "./Canvas/CanvasParams";
import canvasCoordsToSceneCoords from "./canvasCoordsToSceneCoords";
import Ray from "./Scene/Ray";
import Scene from "./Scene/Scene";
import { zeroVec } from "./Scene/Vector";

const setPixel = (
  image: ImageData,
  x: number,
  y: number,
  r: number,
  g: number,
  b: number,
  a: number
) => {
  const index = (x + y * image.width) * 4;
  image.data[index + 0] = r;
  image.data[index + 1] = g;
  image.data[index + 2] = b;
  image.data[index + 3] = a;
};

export default class RayTrace {
  constructor(private canvas: CanvasParams, private scene: Scene) {}
  createImage(context: CanvasRenderingContext2D) {
    const image = context.createImageData(
      this.canvas.width,
      this.canvas.height
    );
    //console.log(image);
    const toSceenCoords = canvasCoordsToSceneCoords(this.canvas);
    //let i = 0;
    for (let y = 0; y <= image.height; ++y) {
      for (let x = 0; x <= image.width; ++x) {
        //console.log({ x, y, i });
        const target = toSceenCoords({ x, y });
        //console.log(target);
        const ray = new Ray(zeroVec(), target);
        //console.log(ray);
        const intersections = this.scene.intersections(ray);
        //console.log(intersections);
        if (intersections.length > 0) {
          setPixel(image, x, y, 256, 0, 0, 256);
        } else {
          setPixel(image, x, y, 0, 0, 0, 256);
        }
      }
    }
    return image;
  }
}
