import Ray from "../src/RayTrace/Scene/Ray";
import SceneCoord from "../src/RayTrace/Scene/SceneCoord";
import Triangle from "../src/RayTrace/Scene/mesh/Triangle";

describe("Triangle", () => {
  describe("when given three points", () => {
    const p1 = new SceneCoord(2, 1, 1);
    const p2 = new SceneCoord(2, 2.5, 1);
    const p3 = new SceneCoord(1, 1.5, 0);
    const triangle = new Triangle([p1, p2, p3]);
    describe("when getting the normal", () => {
      const { normal } = triangle;
      it("should give (-1.5,0,1.5)", () => {
        expect(normal.x).toBeCloseTo(-1.5, 5);
        expect(normal.y).toBeCloseTo(0, 5);
        expect(normal.z).toBeCloseTo(1.5, 5);
      });
    });
  });
  describe("when given another three points", () => {
    const p1 = new SceneCoord(2, 2, 0);
    const p2 = new SceneCoord(2, 1, 1);
    const p3 = new SceneCoord(0, 0.5, 1.5);
    const triangle = new Triangle([p1, p2, p3]);
    describe("when getting the unit normal", () => {
      const { unitNormal } = triangle;
      it("should give (0,-0.70711,-0.70711)", () => {
        expect(unitNormal.x).toBeCloseTo(0, 5);
        expect(unitNormal.y).toBeCloseTo(-0.70711, 5);
        expect(unitNormal.z).toBeCloseTo(-0.70711, 5);
      });
    });
  });
  describe("intersection with a ray", () => {
    describe("intersections", () => {
      const l0 = new SceneCoord(-6, 8, 0);
      const l1 = new SceneCoord(-5, 5, 1);
      const ray = new Ray(l0, l1);

      const p0 = new SceneCoord(2.5, 1.5, 2);
      const p1 = new SceneCoord(2, -4.5, 7.5);
      const p2 = new SceneCoord(-4, -4, 3);
      const tri = new Triangle([p0, p1, p2]);

      it("should give an intersection point (-2.13067,-3.608,3.86933)", () => {
        const result = tri.intersections(ray);
        expect(result).toHaveLength(1);
        if (result[0]) {
          const { x, y, z } = result[0].point;
          expect(x).toBeCloseTo(-2.13067, 5);
          expect(y).toBeCloseTo(-3.608, 5);
          expect(z).toBeCloseTo(3.86933, 5);
        }
      });
    });
  });
});
