import p5 from "p5";
import Colour, { colours } from "../Mesh/Colour";
import Mesh from "../Mesh/Mesh";
import Config from "./Config";
import drawAxes from "./drawAxes";
import drawMesh from "./drawMesh";

export interface SketchConfig {
  rotate: boolean;
  axes: boolean;
}

const sketch =
  (sketchConfig: SketchConfig) =>
  (config: Config, mesh: Mesh) =>
  (context: p5) => {
    const { rotate, axes } = sketchConfig;
    context.setup = () => {
      context.createCanvas(
        context.windowWidth * 0.8,
        context.windowHeight / 2,
        context.WEBGL
      );
    };
    context.draw = () => {
      context.background("black");
      if (rotate) {
        context.rotateX(context.frameCount * 0.01);
        context.rotateY(context.frameCount * 0.02);
      } else {
        context.orbitControl(2, 1, 0.05);
      }
      if (axes) {
        drawAxes(200, 10)(context);
      }
      drawMesh(mesh)(context, config);
    };
  };
export default sketch;
