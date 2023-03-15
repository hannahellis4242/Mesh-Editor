import CanvasParams from "./RayTrace/Canvas/CanvasParams";
import RayTrace from "./RayTrace/RayTrace";
import Mesh from "./RayTrace/Scene/mesh/Mesh";
import Scene from "./RayTrace/Scene/Scene";

const load = () => {
  const htmlCanvas = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement | null;
  if (!htmlCanvas) {
    return;
  }
  const context = htmlCanvas.getContext("2d");
  if (!context) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  const mesh = new Mesh();
  {
    const p1 = mesh.addVertex(3, 5, 6);
    const p2 = mesh.addVertex(8, 6, 7);
    const p3 = mesh.addVertex(11, 10, 5);
    const p4 = mesh.addVertex(4, 10, 6);

    const face1 = mesh.addTrangle([p1, p2, p4]);
    const face2 = mesh.addTrangle([p3, p4, p2]);
    const face3 = mesh.addTrangle([p1, p4, p3]);
    const face4 = mesh.addTrangle([p1, p3, p2]);
  }
  const scene = new Scene({ r: 0, g: 0, b: 0 });
  const canvas = new CanvasParams(htmlCanvas.width, htmlCanvas.height, 2);
  const image = new RayTrace(canvas, scene).createImage(context);
  context.putImageData(image, 0, 0);
};

load();
