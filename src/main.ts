import p5 from "p5";
import Colour from "./RayTrace/Scene/Colour";
import Mesh2 from "./RayTrace/Scene/mesh/Mesh2";
import Vector, { vec } from "./RayTrace/Scene/Vector";

const mesh = new Mesh2(new Colour(256, 0, 0));
{
  const p1 = mesh.addVertex(vec(30, 50, 60));
  const p2 = mesh.addVertex(vec(80, 60, 70));
  const p3 = mesh.addVertex(vec(110, 100, 50));
  const p4 = mesh.addVertex(vec(40, 100, 60));

  mesh.addTrangle([p1, p2, p4], new Colour(0, 255, 0));
  mesh.addTrangle([p3, p4, p2], new Colour(0, 0, 255));
  mesh.addTrangle([p1, p4, p3], new Colour(255, 255, 0));
  mesh.addTrangle([p1, p3, p2]);
}
/*{
  const a = mesh.addVertex(vec(0, 0, 0));
  const b = mesh.addVertex(vec(0, 100, 0));
  const c = mesh.addVertex(vec(100, 100, 0));
  const d = mesh.addVertex(vec(100, 0, 0));

  mesh.addTrangle([a, b, d]);
  mesh.addTrangle([b, c, d]);
}*/
const toP5Vec = ({ x, y, z }: Vector): p5.Vector => {
  return new p5.Vector(x, y, z);
};
const convertMesh = (mesh: Mesh2) =>
  function (this: any) {
    mesh.vertices.forEach((v) => {
      this.vertices.push(toP5Vec(v));
    });
    mesh.surfaces.forEach((surface) => {
      this.faces.push(surface.vertexTags.reverse());
      const n = toP5Vec(surface.unitNormal);
      this.vertexNormals.push(n, n, n);
    });
    this.gid = "my shape";
  };

const myMesh = function (this: any) {
  this.vertices.push(new p5.Vector(0, 0, 0));
  this.vertices.push(new p5.Vector(0, 100, 0));
  this.vertices.push(new p5.Vector(100, 0, 0));
  this.vertices.push(new p5.Vector(100, 100, 0));
  this.faces.push([0, 1, 2]);
  this.faces.push([1, 3, 2]);
};

const shape = new p5.Geometry(1, 1, convertMesh(mesh));
const sketch = (context: p5) => {
  let cam: any;
  context.setup = () => {
    console.log("setup");
    context.createCanvas(
      context.windowWidth - 40,
      context.windowHeight - 40,
      context.WEBGL
    );
    cam = context.createCamera();
  };
  context.draw = () => {
    context.background("black");
    context.orbitControl(2, 1, 0.05);
    context.ambientLight(50);
    context.directionalLight(
      240,
      240,
      240,
      cam.centerX - cam.eyeX,
      cam.centerY - cam.eyeY,
      cam.centerZ - cam.eyeZ
    );
    context.model(shape);
  };
};
new p5(sketch);
