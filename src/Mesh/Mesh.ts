import Vector, { add, scale, zeroVec } from "../RayTrace/Scene/Vector";
import { vec } from "./Vector";
import Triangle from "./Triangle";

export default class Mesh {
  vertices: Vector[];
  surfaces: Triangle[];
  constructor() {
    this.vertices = [];
    this.surfaces = [];
  }
  addVertex({ x, y, z }: Vector): number {
    const found = this.vertices.findIndex(
      (vertex) => vertex.x === x && vertex.y === y && vertex.z === z
    );
    if (found >= 0) {
      return found;
    }
    this.vertices.push(vec(x, y, z));
    return this.vertices.length - 1;
  }
  addTrangle([p1, p2, p3]: [number, number, number]) {
    const v1 = this.vertices.at(p1);
    if (!v1) {
      return;
    }
    const v2 = this.vertices.at(p2);
    if (!v2) {
      return;
    }
    const v3 = this.vertices.at(p3);
    if (!v3) {
      return;
    }

    const surface = new Triangle([p1, p2, p3], [v1, v2, v3]);
    this.surfaces.push(surface);
    return surface;
  }

  removeTriangle(index: number) {
    this.surfaces.splice(index, 1);
  }
}
