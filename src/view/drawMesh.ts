import p5 from "p5";
import Mesh from "../Mesh2/Mesh";
import { add, scale } from "../Mesh2/Vector";
import Config from "./Config";
import getVertices from "../Mesh2/getVertices";
import { unit } from "../Mesh/Vector";
import getNormal from "../Mesh2/getNormal";

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
  mesh.surfaces.forEach(({ indices }) => {
    const vertices = getVertices(...indices)(mesh);
    if (vertices) {
      const [p0, p1, p2] = vertices;
      context.vertex(p0.x, p0.y, p0.z);
      context.vertex(p1.x, p1.y, p1.z);
      context.vertex(p2.x, p2.y, p2.z);
    }
  });
  context.endShape();
  if (normals) {
    const { colour, weight } = normals;
    context.stroke(colour.red, colour.green, colour.blue, colour.alpha);
    context.strokeWeight(weight);
    mesh.surfaces.forEach(({ indices }, i) => {
      const vertices = getVertices(...indices)(mesh);
      if (vertices) {
        const [p0, p1, p2] = vertices;
        const centre = scale(1 / 3)(add(p0, add(p1, p2)));
        const normal = getNormal(i)(mesh);
        if (normal) {
          const dir = scale(normals.size)(unit(normal));
          const end = add(centre, dir);
          context.line(centre.x, centre.y, centre.z, end.x, end.y, end.z);
        }
      }
    });
  }
  context.pop();
};

export default drawMesh;
