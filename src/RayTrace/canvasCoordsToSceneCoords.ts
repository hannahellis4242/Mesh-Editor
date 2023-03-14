import CanvasCoord from "./Canvas/CanvasCoord";
import CanvasParams from "./Canvas/CanvasParams";
import SceneCoord from "./Scene/SceneCoord";

const canvasCoordsToSceneCoords =
  ({ height, width, depth }: CanvasParams) =>
  ({ x, y }: CanvasCoord) =>
    new SceneCoord(x - width / 2, y - height / 2, depth);

export default canvasCoordsToSceneCoords;
