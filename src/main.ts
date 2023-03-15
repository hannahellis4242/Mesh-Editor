import CanvasParams from "./RayTrace/Canvas/CanvasParams";
import RayTrace from "./RayTrace/RayTrace";
import Colour from "./RayTrace/Scene/Colour";
import Mesh from "./RayTrace/Scene/mesh/Mesh";
import Triangle from "./RayTrace/Scene/mesh/Triangle";
import Vertex from "./RayTrace/Scene/mesh/Vertex";
import Scene from "./RayTrace/Scene/Scene";

const load = () => {
  const htmlCanvas = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement | null;
  if (!htmlCanvas) {
    return;
  }
  const context = htmlCanvas.getContext("2d");
  htmlCanvas.width = window.innerWidth;
  htmlCanvas.height = window.innerHeight;
  if (!context) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  const mesh = new Mesh(new Colour(256, 0, 0));
  {
    const p1 = mesh.addVertex(300, 500, 6);
    const p2 = mesh.addVertex(800, 600, 7);
    const p3 = mesh.addVertex(1100, 1000, 5);
    const p4 = mesh.addVertex(400, 1000, 6);

    const face1 = mesh.addTrangle([p1, p2, p4]);
    const face2 = mesh.addTrangle([p3, p4, p2]);
    const face3 = mesh.addTrangle([p1, p4, p3]);
    const face4 = mesh.addTrangle([p1, p3, p2]);
  }
  const scene = new Scene(new Colour(0, 0, 0));
  scene.addShape(mesh);
  const canvas = new CanvasParams(htmlCanvas.width, htmlCanvas.height, 1);
  const image = new RayTrace(canvas, scene).createImage(context);
  console.log(canvas);
  context.putImageData(image, 0, 0);
};

load();
