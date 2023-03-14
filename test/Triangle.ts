import SceneCoord from "../src/RayTrace/Scene/SceneCoord";
import Triangle from "../src/RayTrace/Scene/Triangle";

describe("Triangle", () => {
  describe("when given three points", () => {
    const p1 = new SceneCoord(1, 2, 3);
    const p2 = new SceneCoord(3, 3, 3);
    const p3 = new SceneCoord(4, 5, 6);
    const triangle = new Triangle([p1, p2, p3]);
    describe("when getting the normal", () => {
      const { unitNormal } = triangle;
      expect(unitNormal.x).toBeCloseTo(0.40825, 5);
      expect(unitNormal.y).toBeCloseTo(-0.8165, 5);
      expect(unitNormal.z).toBeCloseTo(0.40825, 5);
    });
  });
  describe("when given another three points", () => {
    const p1 = new SceneCoord(2, 1, 3);
    const p2 = new SceneCoord(3, 4, 1);
    const p3 = new SceneCoord(10, 4, 6);
    const triangle = new Triangle([p1, p2, p3]);
    describe("when getting the normal", () => {
      const { unitNormal } = triangle;
      expect(unitNormal.x).toBeCloseTo(0.46806, 5);
      expect(unitNormal.y).toBeCloseTo(-0.59288, 5);
      expect(unitNormal.z).toBeCloseTo(0.65529, 5);
    });
  });
});
