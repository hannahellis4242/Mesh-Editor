import Vector, {
  add,
  cross,
  dot,
  equalVectors as equalVectors,
  negate,
  scale,
  subtract,
  vec,
  zeroVec,
} from "../src/Mesh2/Vector";

describe("Vector", () => {
  describe("when zero vector", () => {
    it("should be all zeros", () => {
      const { x, y, z } = zeroVec();
      expect(x).toBe(0);
      expect(y).toBe(0);
      expect(z).toBe(0);
    });
  });
  describe("add", () => {
    const a = { x: 1, y: 2, z: 3 };
    const b = { x: 4, y: 5, z: 6 };
    it("should give (5,7,9)", () => {
      const { x, y, z } = add(a, b);
      expect(x).toBe(5);
      expect(y).toBe(7);
      expect(z).toBe(9);
    });
  });
  describe("negate", () => {
    const a = { x: 5, y: -1, z: 2 };
    it("should give (-5,1,-2)", () => {
      const { x, y, z } = negate(a);
      expect(x).toBe(-5);
      expect(y).toBe(1);
      expect(z).toBe(-2);
    });
  });
  describe("subtract", () => {
    const a = { x: 5, y: -1, z: 2 };
    const b = { x: 2, y: -2, z: 4 };
    it("should give (3,1,-2)", () => {
      const { x, y, z } = subtract(a, b);
      expect(x).toBe(3);
      expect(y).toBe(1);
      expect(z).toBe(-2);
    });
  });
  describe("scale", () => {
    const s = scale(5);
    const a = { x: 5, y: -1, z: 2 };
    it("should give (25,-5,10)", () => {
      const { x, y, z } = s(a);
      expect(x).toBe(25);
      expect(y).toBe(-5);
      expect(z).toBe(10);
    });
  });
  describe("dot", () => {
    const a = { x: 1, y: 2, z: 3 };
    const b = { x: -1, y: 4, z: 1 };
    it("should give 10", () => {
      const result = dot(a, b);
      expect(result).toBe(10);
    });
  });
  describe("cross", () => {
    const a = { x: 1, y: 2, z: 3 };
    const b = { x: -1, y: 4, z: 1 };
    it("should give (-10,-4,6)", () => {
      const { x, y, z } = cross(a, b);
      expect(x).toBe(-10);
      expect(y).toBe(-4);
      expect(z).toBe(6);
    });
  });
  describe("equal", () => {
    describe("a vector is always equal to itself", () => {
      const a = vec(1, 2, 3);
      it("should give true", () => {
        expect(equalVectors(a, a)).toBeTruthy();
      });
    });
    describe("two different vectors with different values", () => {
      const a = vec(1, 2, 3);
      const b = vec(1, 3, 3);
      it("should give false", () => {
        expect(equalVectors(a, b)).toBeFalsy();
      });
    });
    describe("two different vectors with the same value", () => {
      const a = vec(1, 2, 3);
      const b = vec(1, 2, 3);
      it("should give true", () => {
        expect(equalVectors(a, b)).toBeTruthy();
      });
    });
  });
});
