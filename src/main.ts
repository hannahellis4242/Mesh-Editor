import p5 from "p5";
import Colour, { colours } from "./Mesh/Colour";
import Mesh from "./Mesh/Mesh";
import { add, scale, vec } from "./Mesh/Vector";

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

interface Stroke {
  weight: number;
  colour: Colour;
}

interface Normals extends Stroke {
  size: number;
}

interface ColourAndSize {
  colour: Colour;
  size: number;
}

interface Config {
  fill?: Colour;
  stroke: Stroke;
  normals?: Normals;
  vertices?: ColourAndSize;
}

const drawMesh = (mesh: Mesh) => (context: p5, config: Config) => {
  context.push();
  const { fill, stroke, normals, vertices } = config;
  if (vertices) {
    const { colour, size } = vertices;
    context.fill(colour.red, colour.green, colour.blue, colour.alpha);
    context.noStroke();
    mesh.vertices.forEach(({ x, y, z }) => {
      context.translate(x, y, z);
      context.sphere(size);
      context.translate(-x, -y, -z);
    });
  }

  if (fill) {
    const { red, green, blue, alpha } = fill;
    context.fill(red, green, blue, alpha);
  } else {
    context.noFill();
  }
  const { colour, weight } = stroke;
  context.stroke(colour.red, colour.green, colour.blue, colour.alpha);
  context.strokeWeight(weight);
  context.beginShape(context.TRIANGLES);
  mesh.surfaces.forEach((surface) => {
    const [p0, p1, p2] = surface.points;
    context.vertex(p0.x, p0.y, p0.z);
    context.vertex(p1.x, p1.y, p1.z);
    context.vertex(p2.x, p2.y, p2.z);
  });
  context.endShape();
  if (normals) {
    const { colour, weight } = normals;
    context.stroke(colour.red, colour.green, colour.blue, colour.alpha);
    context.strokeWeight(weight);
    mesh.surfaces.forEach((surface) => {
      const [p0, p1, p2] = surface.points;
      const centre = scale(1 / 3)(add(p0, add(p1, p2)));
      const dir = scale(normals.size)(surface.unitNormal);
      const end = add(centre, dir);
      context.line(centre.x, centre.y, centre.z, end.x, end.y, end.z);
    });
  }
  context.pop();
};

let rotate = true;
let axes = true;

const drawAxes = (size: number, weight: number) => (context: p5) => {
  context.push();
  context.strokeWeight(weight);
  //x-axis
  context.stroke(255, 0, 0);
  context.line(0, 0, 0, size, 0, 0);
  //y-axis
  context.stroke(0, 255, 0);
  context.line(0, 0, 0, 0, size, 0);
  //z-axis
  context.stroke(0, 0, 255);
  context.line(0, 0, 0, 0, 0, size);
  context.pop();
};

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(
      context.windowWidth - 40,
      context.windowHeight - 40,
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
    drawMesh(mesh)(context, {
      fill: colours.blue,
      stroke: { colour: colours.black, weight: 5 },
      normals: { colour: new Colour(128, 128, 128), weight: 5, size: 20 },
      vertices: { colour: colours.red, size: 10 },
    });
  };
};
new p5(sketch);
