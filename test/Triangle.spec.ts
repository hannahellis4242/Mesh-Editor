import { equalTriangles, triangle, uses } from "../src/Mesh2/Triangle";
describe("Triangle", () => {
  describe("equal", () => {
    describe("one triangle", () => {
      const tri = triangle([0, 1, 2]);
      it("should give true", () => {
        expect(equalTriangles(tri, tri)).toBeTruthy();
      });
    });
    describe("two different triangles", () => {
      const a = triangle([0, 1, 2]);
      const b = triangle([1, 2, 3]);
      it("should give false", () => {
        expect(equalTriangles(a, b)).toBeFalsy();
      });
    });
    describe("two different triangles with the same value", () => {
      const a = triangle([1, 2, 3]);
      const b = triangle([1, 2, 3]);
      it("should give true", () => {
        expect(equalTriangles(a, b)).toBeTruthy();
      });
    });
    describe("two different triangles with rotated values", () => {
      const a = triangle([1, 2, 3]);
      const b = triangle([3, 1, 2]);
      it("should give true", () => {
        expect(equalTriangles(a, b)).toBeTruthy();
      });
    });
    describe("two different triangles with different rotated values", () => {
      const a = triangle([1, 2, 3]);
      const b = triangle([2, 3, 1]);
      it("should give true", () => {
        expect(equalTriangles(a, b)).toBeTruthy();
      });
    });
    describe("two different triangles with anti rotated values", () => {
      const a = triangle([1, 2, 3]);
      const b = triangle([3, 2, 1]);
      it("should give false", () => {
        expect(equalTriangles(a, b)).toBeFalsy();
      });
    });
  });
  describe("uses", () => {
    describe("when the triangle contains the index", () => {
      const tri = triangle([1, 2, 3]);
      it("should return true", () => expect(uses(tri, 1)).toBeTruthy());
    });
    describe("when the triangle does not contain the index", () => {
      const tri = triangle([1, 2, 3]);
      it("should return false", () => expect(uses(tri, 4)).toBeFalsy());
    });
  });
});
