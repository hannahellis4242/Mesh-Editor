import { v4 } from "uuid";
import Intersection from "../Intersection";
import Ray from "../Ray";
import Surface2 from "./Surface2";
import Vertex2 from "./Vertex2";
import Shape from "../Shape";
import Colour from "../Colour";
import Vector, { add, scale, zeroVec } from "../Vector";

export default class Mesh2 implements Shape {
  vertices: Vertex2[];
  surfaces: Surface2[];
  public centre?: Vector;
  constructor(private readonly colour: Colour) {
    this.vertices = [];
    this.surfaces = [];
  }
  transform(f: (v: Vector) => Vector): Shape {
    const newMesh = new Mesh2(this.colour);
    this.vertices.forEach((v) => newMesh.addVertex(f(v), v.tag));
    this.surfaces.forEach((s) => {
      newMesh.addTrangle(s.vertexTags, s.colour);
    });
    return newMesh;
  }
  findVertexByTag(target: number) {
    return this.vertices.find(({ tag }) => target === tag);
  }
  addVertex({ x, y, z }: Vector, tag?: number): number {
    const found = this.vertices.find(
      (vertex) => vertex.x === x && vertex.y === y && vertex.z === z
    );
    if (found) {
      return found.tag;
    }
    const tagToUse = tag || this.vertices.length;
    this.vertices.push(new Vertex2(x, y, z, tagToUse));
    const { sum, count } = this.vertices.reduce<{ sum: Vector; count: number }>(
      (acc, x) => {
        return { sum: add(acc.sum, x), count: acc.count + 1 };
      },
      { sum: zeroVec(), count: 0 }
    );
    this.centre = scale(1 / count)(sum);
    return tagToUse;
  }
  addTrangle([p1, p2, p3]: [number, number, number], colour?: Colour) {
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
    const tag = this.surfaces.length;
    const surface = new Surface2([v1, v2, v3], tag, colour || this.colour);
    this.surfaces.push(surface);
    return tag;
  }
  intersections(ray: Ray): Intersection[] {
    return this.surfaces.flatMap((tri) => tri.intersections(ray));
  }
}
