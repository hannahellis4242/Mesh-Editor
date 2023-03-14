import SceneCoord from "../src/RayTrace/Scene/SceneCoord";
import Ray from "../src/RayTrace/Scene/Ray";

describe("Ray", () => {
  describe("when given a point (1,2,3)", () => {
    const point1 = new SceneCoord(1, 2, 3);
    describe("and another point (4,5,6)", () => {
      const point2 = new SceneCoord(4, 5, 6);
      describe("and constructing a ray from these", () => {
        const ray = new Ray(point1, point2);
        it("should give back a Ray with source (1,2,3)", () => {
          const { source } = ray;
          expect(source.x).toBe(1);
          expect(source.y).toBe(2);
          expect(source.z).toBe(3);
        });
        it("should give back a Ray with target (4,5,6)", () => {
          const { target } = ray;
          expect(target.x).toBe(4);
          expect(target.y).toBe(5);
          expect(target.z).toBe(6);
        });
        describe("when getting the direction of the ray", () => {
          const dir = ray.direction();
          it("should give (3,3,3)", () => {
            expect(dir.x).toBe(3);
            expect(dir.y).toBe(3);
            expect(dir.z).toBe(3);
          });
        });
        describe("when getting a point midway along the ray", () => {
          const p = ray.point(0.5);
          it("should give (2.5,3.5,4.5)", () => {
            expect(p.x).toBe(2.5);
            expect(p.y).toBe(3.5);
            expect(p.z).toBe(4.5);
          });
        });
        describe("when getting a point extended by half along the ray", () => {
          const p = ray.point(1.5);
          it("should give (5.5,6.5,7.5)", () => {
            expect(p.x).toBe(5.5);
            expect(p.y).toBe(6.5);
            expect(p.z).toBe(7.5);
          });
        });
      });
    });
  });
});
