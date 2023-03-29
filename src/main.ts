import p5 from "p5";
import Mesh from "./Mesh/Mesh";
import Vector, { vec } from "./Mesh/Vector";

const mesh = new Mesh();
{
  const p0 = mesh.addVertex(vec(-100, -100, 0));
  const p1 = mesh.addVertex(vec(100, -100, 0));
  const p2 = mesh.addVertex(vec(100, 100, 0));
  const p3 = mesh.addVertex(vec(-100, 100, 0));
  const p4 = mesh.addVertex(vec(0, 0, 100));
  mesh.addTrangle([p0, p3, p1]);
  mesh.addTrangle([p1, p3, p2]);
  mesh.addTrangle([p0, p1, p4]);
  mesh.addTrangle([p3, p0, p4]);
  mesh.addTrangle([p2, p3, p4]);
  mesh.addTrangle([p1, p2, p4]);
}
console.log(mesh);
const toP5Vec = ({ x, y, z }: Vector): p5.Vector => {
  return new p5.Vector(x, y, z);
};
const convertMesh = (mesh: Mesh, colour: p5.Vector) =>
  function (this: any) {
    mesh.vertices.forEach((v) => {
      this.vertices.push(toP5Vec(v));
    });
    mesh.surfaces.forEach((surface) => {
      this.faces.push(surface.indices);
      const n = toP5Vec(surface.unitNormal);
      this.vertexNormals.push(n, n, n);
      this.vertexColors.push(colour, colour, colour);
    });
    this.gid = "my shape";
  };

const shape = new p5.Geometry(
  1,
  1,
  convertMesh(mesh, new p5.Vector(0.5, 0, 0))
);
console.log(shape);
const sketch = (context: p5) => {
  let cam: any;
  context.setup = () => {
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
      0,
      240,
      cam.centerX - cam.eyeX,
      cam.centerY - cam.eyeY,
      cam.centerZ - cam.eyeZ
    );
    context.model(shape);
  };
};
new p5(sketch);
