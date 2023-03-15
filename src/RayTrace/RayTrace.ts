import CanvasCoord from "./Canvas/CanvasCoord";
import CanvasParams from "./Canvas/CanvasParams";
import canvasCoordsToSceneCoords from "./canvasCoordsToSceneCoords";
import Colour from "./Scene/Colour";
import Ray from "./Scene/Ray";
import Scene from "./Scene/Scene";
import { zeroVec } from "./Scene/Vector";

const setPixel = (
  image: ImageData,
  { x, y }: CanvasCoord,
  { red, green, blue, alpha }: Colour
) => {
  const index = (x + y * image.width) * 4;
  image.data[index + 0] = red;
  image.data[index + 1] = green;
  image.data[index + 2] = blue;
  image.data[index + 3] = alpha;
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
          setPixel(image, { x, y }, new Colour(256, 0, 0));
        } else {
          setPixel(image, { x, y }, this.scene.backround);
        }
      }
    }
    return image;
  }
}
