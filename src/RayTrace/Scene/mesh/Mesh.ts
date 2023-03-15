import { v4 } from "uuid";
import Intersection from "../Intersection";
import Ray from "../Ray";
import Surface from "./Surface";
import Vertex from "./Vertex";
import Shape from "../Shape";
import Colour from "../Colour";

export default class Mesh implements Shape {
  vertices: Vertex[];
  surfaces: Surface[];
  constructor(private readonly colour: Colour) {
    this.vertices = [];
    this.surfaces = [];
  }
  findVertexByTag(target: string) {
    return this.vertices.find(({ tag }) => target === tag);
  }
  addVertex(x: number, y: number, z: number): string {
    const found = this.vertices.find(
      (vertex) => vertex.x === x && vertex.y === y && vertex.z === z
    );
    if (found) {
      return found.tag;
    }
    const tag = v4();
    this.vertices.push(new Vertex(x, y, z, tag));
    return tag;
  }
  addTrangle([p1, p2, p3]: [string, string, string], colour?: Colour) {
    const v1 = this.findVertexByTag(p1);
    if (!v1) {
      return;
    }
    const v2 = this.findVertexByTag(p2);
    if (!v2) {
      return;
    }
    const v3 = this.findVertexByTag(p3);
    if (!v3) {
      return;
    }
    const tag = v4();
    const surface = new Surface([v1, v2, v3], tag, colour || this.colour);
    this.surfaces.push(surface);
    return tag;
  }
  intersections(ray: Ray): Intersection[] {
    return this.surfaces.flatMap((tri) => tri.intersections(ray));
  }
}
