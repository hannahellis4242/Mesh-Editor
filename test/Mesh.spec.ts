import Mesh, {
  addSurface,
  addSurfaces,
  getSurface,
  getVertex,
  removeSurface,
  removeVertex,
  replaceSurface,
  replaceVertex,
} from "../src/Mesh2/Mesh";
import unitMesh from "../src/Mesh2/unitMesh";
import addVertex from "../src/Mesh2/addVertex";
import addVertices from "../src/Mesh2/addVertices";
import { vec } from "../src/Mesh2/Vector";

describe("Mesh", () => {
  describe("vertex operations", () => {
    describe("getting a vertex from a mesh", () => {
      const init = addVertex(vec(1, 2, 3))(unitMesh());
      it("should find the zeroth entry", () => {
        const value = getVertex(init, 0);
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
        const value = getVertex(init, 1);
        expect(value).toBeUndefined();
      });
    });
    describe("replacing a vertex", () => {
      const vertex = vec(1, 2, 3);
      const init = addVertex(vertex)(unitMesh());
      it("should have one vertex with a new value", () => {
        const mesh = replaceVertex(init, { index: 0, value: vec(3, 2, 1) });
        expect(mesh.vertices).toHaveLength(1);
        const value = getVertex(mesh, 0);
        expect(value).toBeDefined();
        if (value) {
          const { x, y, z } = value;
          expect(x).toBe(3);
          expect(y).toBe(2);
          expect(z).toBe(1);
        }
      });
    });
    describe("removing an existing vertex from the mesh", () => {
      const init = addVertex(vec(2, 3, 4))(addVertex(vec(1, 2, 3))(unitMesh()));
      const mesh = removeVertex(init, 1);
      it("should now have only one vertex", () =>
        expect(mesh.vertices).toHaveLength(1));
    });
    describe("removing a vertex again", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = removeVertex(init, 3);
      it("should remove a vertex", () => {
        expect(mesh.vertices).toHaveLength(3);
      });
    });
  });
  describe("surface operations", () => {
    describe("unit mesh", () => {
      const mesh = unitMesh();
      it("should have no surfaces", () => {
        expect(mesh.surfaces).toHaveLength(0);
      });
    });
    describe("when adding a surface", () => {
      const init = addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(
        unitMesh()
      );
      const mesh = addSurface(init, [0, 1, 2]);
      it("should have one surface", () => {
        expect(mesh.surfaces).toHaveLength(1);
      });
      it("should have value [0,1,2]", () => {
        const [triangle] = mesh.surfaces;
        const [p0, p1, p2] = triangle.indices;
        expect(p0).toBe(0);
        expect(p1).toBe(1);
        expect(p2).toBe(2);
      });
    });
    describe("when adding a surface with and index that doesn't exist", () => {
      const init = addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(
        unitMesh()
      );
      const mesh = addSurface(init, [0, 1, 3]);
      it("should have no surfaces", () => {
        expect(mesh.surfaces).toHaveLength(0);
      });
    });
    describe("when adding a surface that already exists", () => {
      const init = addSurface(
        addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(unitMesh()),
        [0, 1, 2]
      );
      const mesh = addSurface(init, [0, 1, 2]);
      it("should have one surface", () => {
        expect(mesh.surfaces).toHaveLength(1);
      });
    });
    describe("when adding a surface that already exists but is just a rotation", () => {
      const init = addSurface(
        addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(unitMesh()),
        [0, 1, 2]
      );
      const mesh = addSurface(init, [1, 2, 0]);
      it("should have one surface", () => {
        expect(mesh.surfaces).toHaveLength(1);
      });
    });
    describe("when adding a new surface", () => {
      const init = addSurface(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
        ])(unitMesh()),
        [0, 1, 2]
      );
      const mesh = addSurface(init, [0, 2, 3]);
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
    });
    describe("adding surfaces", () => {
      const mesh = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
    });
    describe("getting a surface", () => {
      const mesh = addSurface(
        addSurface(
          addVertices([
            vec(-1, -1, 0),
            vec(1, -1, 1),
            vec(1, 1, -1),
            vec(-1, 1, 0),
          ])(unitMesh()),
          [0, 1, 2]
        ),
        [0, 2, 3]
      );
      it("should give the first surface", () => {
        const value = getSurface(mesh, 0);
        expect(value).toBeDefined();
        if (value) {
          const [p0, p1, p2] = value.indices;
          expect(p0).toBe(0);
          expect(p1).toBe(1);
          expect(p2).toBe(2);
        }
      });
    });
    describe("getting a surface that doesn't exist", () => {
      const mesh = addSurface(
        addSurface(
          addVertices([
            vec(-1, -1, 0),
            vec(1, -1, 1),
            vec(1, 1, -1),
            vec(-1, 1, 0),
          ])(unitMesh()),
          [0, 1, 2]
        ),
        [0, 2, 3]
      );
      it("should give the first surface", () => {
        const value = getSurface(mesh, 2);
        expect(value).toBeUndefined();
      });
    });
    describe("editing a surface", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
          vec(0, 2, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = replaceSurface(init, { index: 1, value: [0, 2, 4] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should have updated the last surface to be new value", () => {
        const found = getSurface(mesh, 1);
        expect(found).toBeTruthy();
        if (found) {
          const [p0, p1, p2] = found.indices;
          expect(p0).toBe(0);
          expect(p1).toBe(2);
          expect(p2).toBe(4);
        }
      });
    });
    describe("editing a surface that doesn't exist", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
          vec(0, 2, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = replaceSurface(init, { index: 5, value: [0, 2, 4] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should give back the same mesh", () => expect(mesh).toBe(init));
    });
    describe("replacing a surface with a new surface that uses a vertex that doesn't exist", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
          vec(0, 2, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = replaceSurface(init, { index: 1, value: [0, 5, 4] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should give back the same mesh", () => expect(mesh).toBe(init));
    });
    describe("replacing a surface with an existing surface", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
          vec(0, 2, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = replaceSurface(init, { index: 1, value: [0, 1, 2] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should give back the same mesh", () => expect(mesh).toBe(init));
    });
    describe("remove a surface", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
          vec(0, 2, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = removeSurface(init, 1);
      it("should have one surface", () => {
        expect(mesh.surfaces).toHaveLength(1);
      });
    });
    describe("remove a surface that doesn't exist", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
          vec(0, 2, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = removeSurface(init, 4);
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should still be the same mesh", () => expect(mesh).toBe(init));
    });
  });
  describe("interaction between vertex and surface operations", () => {
    describe("removing a vertex", () => {
      const init = addSurfaces(
        addVertices([
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
        ])(unitMesh()),
        [
          [0, 1, 2],
          [0, 2, 3],
        ]
      );
      const mesh = removeVertex(init, 3);
      it("should also remove any surface that uses the vertex", () => {
        expect(mesh.vertices).toHaveLength(3);
        expect(mesh.surfaces).toHaveLength(1);
      });
    });
  });
  describe("surface normals", () => {
    it("placeholder", () => expect(true).toBeTruthy());
  });
});
