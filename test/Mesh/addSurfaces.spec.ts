import { vec } from "../../src/Mesh2/Vector";
import addVertices from "../../src/Mesh2/addVertices";
import unitMesh from "../../src/Mesh2/unitMesh";
import addSurfaces from "../../src/Mesh2/addSurfaces";

describe("addingSurfaces", () => {
  describe("adding surfaces", () => {
    const mesh = addSurfaces(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertices(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0)
      )(unitMesh())
    );
    it("should have two surfaces", () => {
      expect(mesh.surfaces).toHaveLength(2);
    });
  });
});
