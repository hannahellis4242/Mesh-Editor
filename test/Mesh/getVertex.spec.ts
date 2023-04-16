import { vec } from "../../src/Mesh2/Vector";
import addVertex from "../../src/Mesh2/addVertex";
import unitMesh from "../../src/Mesh2/unitMesh";
import getVertex from "../../src/Mesh2/getVertex";

describe("getVertex", () => {
  describe("getting a vertex from a mesh", () => {
    const init = addVertex(vec(1, 2, 3))(unitMesh());
    it("should find the zeroth entry", () => {
      const value = getVertex(0)(init);
      expect(value).toBeDefined();
      if (value) {
        const { x, y, z } = value;
        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(3);
      }
    });
  });
  describe("getting a vertex from a mesh that doesn't exist", () => {
    const init = addVertex(vec(1, 2, 3))(unitMesh());
    it("should find the first entry", () => {
      const value = getVertex(1)(init);
      expect(value).toBeUndefined();
    });
  });
});
