import CanvasCoord from "./Canvas/CanvasCoord";
import CanvasParams from "./Canvas/CanvasParams";
import canvasCoordsToSceneCoords from "./canvasCoordsToSceneCoords";
import Colour from "./Scene/Colour";
import Intersection from "./Scene/Intersection";
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

const findClosest = (xs: Intersection[]): Intersection | undefined =>
  xs.reduce<Intersection | undefined>((acc, x) => {
    if (!acc) {
      return x;
    }
    return acc.distance < x.distance ? acc : x;
  }, undefined);

const render = (
  context: CanvasRenderingContext2D,
  canvas: CanvasParams,
  scene: Scene
) => {
  const image = context.createImageData(canvas.width, canvas.height);
  const toSceenCoords = canvasCoordsToSceneCoords(canvas);
  for (let y = 0; y <= image.height; ++y) {
    for (let x = 0; x <= image.width; ++x) {
      const target = toSceenCoords({ x, y });
      const ray = new Ray(zeroVec(), target);
      const intersections = scene.intersections(ray);
      const closest = findClosest(intersections);
      const colour = closest ? closest.baseColour : scene.backround;
      setPixel(image, { x, y }, colour);
    }
  }
  return image;
};

export default render;
