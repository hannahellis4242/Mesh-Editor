import { vec } from "../../src/Mesh2/Vector";
import addVertex from "../../src/Mesh2/addVertex";
import unitMesh from "../../src/Mesh2/unitMesh";
import getVertices from "../../src/Mesh2/getVertices";

describe("getVertices", () => {
  describe("getting multiple vertices from a mesh", () => {
    const init = addVertex(
      vec(1, 2, 3),
      vec(2, 3, 4),
      vec(3, 4, 5),
      vec(4, 5, 6)
    )(unitMesh());
    it("should give back multiple entries", () => {
      const value = getVertices(0, 2, 3)(init);
      expect(value).toBeDefined();
      expect(value!).toHaveLength(3);
    });
  });
  describe("getting multiple vertices from a mesh when one doesn't exist", () => {
    const init = addVertex(
      vec(1, 2, 3),
      vec(2, 3, 4),
      vec(3, 4, 5),
      vec(4, 5, 6)
    )(unitMesh());
    it("should give back multiple entries", () => {
      const value = getVertices(0, 2, 3, 9)(init);
      expect(value).toBeUndefined();
    });
  });
});
