import matrix3, { det } from "../../lin-alg/matrix3";
import Vector, { cross, subtract, unit } from "../../mesh/Vector";
import Ray from "./Ray";

export interface IntersectionParams {
  t: number;
  u: number;
  v: number;
}

export default class Triangle {
  private readonly p01: Vector;
  private readonly p02: Vector;
  public readonly unitNormal: Vector;
  constructor(public readonly points: [Vector, Vector, Vector]) {
    this.p01 = subtract(this.points[1], this.points[0]);
    this.p02 = subtract(this.points[2], this.points[0]);
    this.unitNormal = unit(cross(this.p01, this.p02));
  }
  intersects(l: Ray): boolean {
    const lab = l.direction();
    const m: matrix3 = [
      -lab.x,
      this.p01.x,
      this.p02.x,
      -lab.y,
      this.p01.y,
      this.p02.y,
      -lab.z,
      this.p01.z,
      this.p02.z,
    ];
    const detM = det(m);
    if (detM === 0) {
      return false;
    }
    const b = subtract(l.source,this.points[0]);
    const Mu:matrx3d:[
      -lab.x,
      this.p01.x,
      this.p02.x,
      b.x,
      b.y,
      b.z,
      -lab.z,
      this.p01.z,
      this.p02.z,
    ];
    const u = det(Mu)/detM;
    if(u < 0 || u > 1){
      return false;
    }
    
    const Mv:matrx3d:[
      -lab.x,
      this.p01.x,
      this.p02.x,
      -lab.y,
      this.p01.y,
      this.p02.y,
      b.x,
      b.y,
      b.z,
    ];
    const v = det(Mv)/detM;
    if(v < 0 || v > 1){
      return false;
    }
    if(u+v > 1)
    {
      return false;
    }
    return true;
  }
}
