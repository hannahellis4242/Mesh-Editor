import CanvasParams from "./RayTrace/Canvas/CanvasParams";
import render from "./RayTrace/render";
import Colour from "./RayTrace/Scene/Colour";
import Mesh from "./RayTrace/Scene/mesh/Mesh";
import Scene from "./RayTrace/Scene/Scene";
import { vec } from "./RayTrace/Scene/Vector";

const paint = (
  context: CanvasRenderingContext2D,
  tx: number,
  ty: number,
  tz: number,
  rx: number,
  ry: number,
  rz: number
) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  const mesh = new Mesh(new Colour(256, 0, 0));
  {
    const p1 = mesh.addVertex(vec(300, 500, 6));
    const p2 = mesh.addVertex(vec(800, 600, 7));
    const p3 = mesh.addVertex(vec(1100, 1000, 5));
    const p4 = mesh.addVertex(vec(400, 1000, 6));

    const face1 = mesh.addTrangle([p1, p2, p4], new Colour(0, 255, 0));
    const face2 = mesh.addTrangle([p3, p4, p2], new Colour(0, 0, 255));
    const face3 = mesh.addTrangle([p1, p4, p3], new Colour(255, 255, 0));
    const face4 = mesh.addTrangle([p1, p3, p2]);
  }
  const scene = new Scene(new Colour(0, 0, 0));
  scene.addShape(mesh);
  const canvas = new CanvasParams(
    context.canvas.width,
    context.canvas.height,
    1
  );
  const image = render(context, canvas, scene.translateScene(vec(tx, ty, tz)));
  context.putImageData(image, 0, 0);
};

const foo = () => {
  const controlSection = document.getElementById("control");
  if (!controlSection) {
    return;
  }

  controlSection.replaceChildren();

  const htmlCanvas = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement | null;
  if (!htmlCanvas) {
    return;
  }
  const context = htmlCanvas.getContext("2d");
  htmlCanvas.width = window.innerWidth * 0.7;
  htmlCanvas.height = window.innerHeight;
  if (!context) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }
  let tx = 0;
  let ty = 0;
  let tz = 0;
  let rx = 0;
  let ry = 0;
  let rz = 0;
  {
    const tranlateControl = document.createElement("section");
    {
      const transX = document.createElement("input") as HTMLInputElement;
      transX.type = "range";
      transX.min = (-5 * htmlCanvas.width).toString();
      transX.max = (5 * htmlCanvas.width).toString();
      transX.value = tx.toString();
      transX.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        tx = Number(target.value);
        paint(context, tx, ty, tz, rx, ry, rz);
      };
      tranlateControl.appendChild(transX);
    }

    {
      const transY = document.createElement("input") as HTMLInputElement;
      transY.type = "range";
      transY.min = (-5 * htmlCanvas.height).toString();
      transY.max = (5 * htmlCanvas.height).toString();
      transY.value = tx.toString();
      transY.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        ty = Number(target.value);
        paint(context, tx, ty, tz, rx, ry, rz);
      };
      tranlateControl.appendChild(transY);
    }

    {
      const transZ = document.createElement("input") as HTMLInputElement;
      transZ.type = "range";
      transZ.min = "0";
      transZ.max = "200";
      transZ.value = tx.toString();
      transZ.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        tz = Number(target.value);
        paint(context, tx, ty, tz, rx, ry, rz);
      };
      tranlateControl.appendChild(transZ);
    }
    controlSection.appendChild(tranlateControl);
  }

  {
    const rotateControl = document.createElement("section");
    {
      const rotX = document.createElement("input") as HTMLInputElement;
      rotX.type = "range";
      rotX.min = "0";
      rotX.max = "360";
      rotX.value = tx.toString();
      rotX.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        rx = Number(target.value);
        paint(context, tx, ty, tz, rx, ry, rz);
      };
      rotateControl.appendChild(rotX);
    }

    {
      const rotY = document.createElement("input") as HTMLInputElement;
      rotY.type = "range";
      rotY.min = "0";
      rotY.max = "360";
      rotY.value = tx.toString();
      rotY.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        ry = Number(target.value);
        paint(context, tx, ty, tz, rx, ry, rz);
      };
      rotateControl.appendChild(rotY);
    }

    {
      const rotZ = document.createElement("input") as HTMLInputElement;
      rotZ.type = "range";
      rotZ.min = "0";
      rotZ.max = "360";
      rotZ.value = tx.toString();
      rotZ.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        rz = Number(target.value);
        paint(context, tx, ty, tz, rx, ry, rz);
      };
      rotateControl.appendChild(rotZ);
    }
    controlSection.appendChild(rotateControl);
  }

  paint(context, tx, ty, tz, rx, ry, rz);
};

foo();
