import Triangle from "../src/Mesh/Triangle";
import { vec } from "../src/Mesh/Vector";
describe("Triangle", () => {
  describe("when flat", () => {
    const p1 = vec(0, 0, 0);
    const p2 = vec(1, 0, 0);
    const p3 = vec(0, 1, 0);
    const triangle = new Triangle([1, 2, 3], [p1, p2, p3]);
    it("should contain the index 1", () => {
      expect(triangle.contains(1)).toBeTruthy();
    });
    it("should not contain the index 4", () => {
      expect(triangle.contains(4)).toBeFalsy();
    });
    const { normal } = triangle;
    it("should give a normal (0,0,1)", () => {
      const { x, y, z } = normal;
      expect(x).toBe(0);
      expect(y).toBe(0);
      expect(z).toBe(1);
    });
  });
  describe("when angled", () => {
    const p1 = vec(2, 0, 0);
    const p2 = vec(0, 2, 0);
    const p3 = vec(0, 0, 2);
    const triangle = new Triangle([1, 2, 3], [p1, p2, p3]);
    const { normal } = triangle;
    it("should give a normal (4,4,4)", () => {
      const { x, y, z } = normal;
      expect(x).toBe(4);
      expect(y).toBe(4);
      expect(z).toBe(4);
    });
    const { unitNormal } = triangle;
    it("should give a unitNormal 1/sqrt(3)(1,1,1)", () => {
      const value = 1 / Math.sqrt(3);
      const { x, y, z } = unitNormal;
      expect(x).toBe(value);
      expect(y).toBe(value);
      expect(z).toBe(value);
    });
  });
});
