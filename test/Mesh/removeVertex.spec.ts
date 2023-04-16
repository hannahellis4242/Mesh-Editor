import addSurface from "../../src/Mesh2/addSurface";
import { vec } from "../../src/Mesh2/Vector";
import addVertex from "../../src/Mesh2/addVertex";
import unitMesh from "../../src/Mesh2/unitMesh";
import removeVertex from "../../src/Mesh2/removeVertex";

describe("removeVertex", () => {
  describe("removing an existing vertex from the mesh", () => {
    const init = addVertex(vec(2, 3, 4))(addVertex(vec(1, 2, 3))(unitMesh()));
    const mesh = removeVertex(1)(init);
    it("should now have only one vertex", () =>
      expect(mesh.vertices).toHaveLength(1));
  });
  describe("removing a vertex again", () => {
    const init = addSurface(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertex(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0)
      )(unitMesh())
    );
    const mesh = removeVertex(3)(init);
    it("should remove a vertex", () => {
      expect(mesh.vertices).toHaveLength(3);
    });
  });
  describe("when removing a vertex", () => {
    const init = addSurface(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertex(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0)
      )(unitMesh())
    );
    const mesh = removeVertex(3)(init);
    it("should also remove any surface that uses the vertex", () => {
      expect(mesh.vertices).toHaveLength(3);
      expect(mesh.surfaces).toHaveLength(1);
    });
  });
});
