import Mesh, {
  addSurface,
  addVertex,
  addVertices,
  getSurface,
  getVertex,
  removeVertex,
  replaceVertex,
  unit,
} from "../src/Mesh2/Mesh";
import { vec } from "../src/Mesh2/Vector";

describe("Mesh", () => {
  describe("vertex operations", () => {
    describe("unit mesh", () => {
      const init = unit();
      it("should have no vertices", () =>
        expect(init.vertices).toHaveLength(0));
    });
    describe("when adding a vertex to a unit mesh", () => {
      const init = unit();
      const mesh = addVertex(init, vec(1, 2, 3));
      it("should have one vertex", () => expect(mesh.vertices).toHaveLength(1));
      it("and it should have the same value as the vertex added", () => {
        const [vertex] = mesh.vertices;
        const { x, y, z } = vertex;
        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(3);
      });
    });
    describe("adding two different vertices to a unit mesh", () => {
      const init = addVertex(unit(), vec(1, 2, 3));
      const mesh = addVertex(init, vec(2, 4, 9));
      it("should have two vertices", () =>
        expect(mesh.vertices).toHaveLength(2));
      it("and it should contain the same value as the vertex added", () => {
        const { x, y, z } = mesh.vertices.at(-1)!;
        expect(x).toBe(2);
        expect(y).toBe(4);
        expect(z).toBe(9);
      });
    });
    describe("adding a second vertex that is the same as the first", () => {
      const init = addVertex(unit(), vec(1, 2, 3));
      const mesh = addVertex(init, vec(1, 2, 3));
      it("should have one vertex", () => expect(mesh.vertices).toHaveLength(1));
    });
    describe("adding mulitple verctices to the mesh", () => {
      const mesh = addVertices(unit(), [
        vec(1, 2, 3),
        vec(2, 3, 4),
        vec(3, 4, 5),
        vec(1, 2, 3),
        vec(4, 5, 6),
      ]);
      it("should have 4 vertices", () => {
        expect(mesh.vertices).toHaveLength(4);
      });
    });
    describe("getting a vertex from a mesh", () => {
      const init = addVertex(unit(), vec(1, 2, 3));
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
      const init = addVertex(unit(), vec(1, 2, 3));
      it("should find the first entry", () => {
        const value = getVertex(init, 1);
        expect(value).toBeUndefined();
      });
    });
    describe("replacing a vertex", () => {
      const vertex = vec(1, 2, 3);
      const init = addVertex(unit(), vertex);
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
      const init = addVertex(addVertex(unit(), vec(1, 2, 3)), vec(2, 3, 4));
      const mesh = removeVertex(init, 1);
      it("should now have only one vertex", () =>
        expect(mesh.vertices).toHaveLength(1));
    });
  });
  describe("surface operations", () => {
    describe("unit mesh", () => {
      const mesh = unit();
      it("should have no surfaces", () => {
        expect(mesh.surfaces).toHaveLength(0);
      });
    });
    describe("when adding a surface", () => {
      const init = addVertices(unit(), [
        vec(5, -4, 0),
        vec(4, 2, 0),
        vec(-1, 5, 0),
      ]);
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
      const init = addVertices(unit(), [
        vec(5, -4, 0),
        vec(4, 2, 0),
        vec(-1, 5, 0),
      ]);
      const mesh = addSurface(init, [0, 1, 3]);
      it("should have no surfaces", () => {
        expect(mesh.surfaces).toHaveLength(0);
      });
    });
    describe("when adding a surface that already exists", () => {
      const init = addSurface(
        addVertices(unit(), [vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)]),
        [0, 1, 2]
      );
      const mesh = addSurface(init, [0, 1, 2]);
      it("should have one surface", () => {
        expect(mesh.surfaces).toHaveLength(1);
      });
    });
    describe("when adding a surface that already exists but is just a rotation", () => {
      const init = addSurface(
        addVertices(unit(), [vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)]),
        [0, 1, 2]
      );
      const mesh = addSurface(init, [1, 2, 0]);
      it("should have one surface", () => {
        expect(mesh.surfaces).toHaveLength(1);
      });
    });
    describe("when adding a new surface", () => {
      const init = addSurface(
        addVertices(unit(), [
          vec(-1, -1, 0),
          vec(1, -1, 1),
          vec(1, 1, -1),
          vec(-1, 1, 0),
        ]),
        [0, 1, 2]
      );
      const mesh = addSurface(init, [0, 2, 3]);
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
    });
    describe("getting a surface", () => {
      const mesh = addSurface(
        addSurface(
          addVertices(unit(), [
            vec(-1, -1, 0),
            vec(1, -1, 1),
            vec(1, 1, -1),
            vec(-1, 1, 0),
          ]),
          [0, 1, 2]
        ),
        [0, 2, 3]
      );
      it("should have two surfaces", () => {
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
  });
  describe("interaction between vertex and surface operations", () => {
    it("placeholder", () => expect(true).toBeTruthy());
  });
  describe("surface normals", () => {
    it("placeholder", () => expect(true).toBeTruthy());
  });
});
