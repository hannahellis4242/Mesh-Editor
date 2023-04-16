import p5 from "p5";
import Colour, { colours } from "./Mesh/Colour";
import Mesh from "./Mesh2/Mesh";
import { vec } from "./Mesh/Vector";
import sketch from "./view/sketch";
import addSurface from "./Mesh2/addSurface";
import addVertex from "./Mesh2/addVertex";
import unitMesh from "./Mesh2/unitMesh";
import removeSurface from "./Mesh2/removeSurface";
import removeVertex from "./Mesh2/removeVertex";

let mesh = unitMesh();
const initMesh = (mesh: Mesh): Mesh =>
  addSurface(
    [0, 3, 1],
    [1, 3, 2],
    [0, 1, 4],
    [3, 0, 4],
    [2, 3, 4],
    [1, 2, 4]
  )(
    addVertex(
      vec(-100, -100, 0),
      vec(100, -100, 0),
      vec(100, 100, 0),
      vec(-100, 100, 0),
      vec(0, 0, 100)
    )(mesh)
  );
mesh = initMesh(mesh);

const config = {
  fill: colours.blue,
  stroke: { colour: colours.black, weight: 5 },
  normals: { colour: new Colour(128, 128, 128), weight: 5, size: 20 },
  vertices: { colour: colours.red, size: 5 },
};
let drawing = new p5(sketch({ rotate: false, axes: true })(config, mesh));

const refresh = (newMesh: Mesh) => {
  mesh = newMesh;
  drawing.remove();
  drawing = new p5(sketch({ rotate: false, axes: true })(config, mesh));
  drawTables(mesh);
};

const createRowButtons = (row: HTMLTableRowElement, rm: () => void) => {
  {
    const data = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("select");
    button.innerText = "select";
    data.appendChild(button);
    row.appendChild(data);
  }
  {
    const data = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("remove");
    button.innerText = "remove";
    button.onclick = rm;
    data.appendChild(button);
    row.appendChild(data);
  }
  {
    const data = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("edit");
    button.innerText = "edit";
    data.appendChild(button);
    row.appendChild(data);
  }
};

const drawTables = (mesh: Mesh) => {
  const vertexTable = document.getElementById("vertex-table");
  if (vertexTable) {
    vertexTable.replaceChildren();
    mesh.vertices.forEach(({ x, y, z }, index) => {
      const row = document.createElement("tr");
      {
        const data = document.createElement("td");
        data.innerText = index.toString();
        row.appendChild(data);
      }
      {
        const data = document.createElement("td");
        data.innerText = x.toString();
        row.appendChild(data);
      }
      {
        const data = document.createElement("td");
        data.innerText = y.toString();
        row.appendChild(data);
      }
      {
        const data = document.createElement("td");
        data.innerText = z.toString();
        row.appendChild(data);
      }
      createRowButtons(row, () => {
        refresh(removeVertex(index)(mesh));
      });
      vertexTable.appendChild(row);
    });
  }

  const triangleTable = document.getElementById("triangle-table");
  if (triangleTable) {
    triangleTable.replaceChildren();
    mesh.surfaces.forEach((surface, index) => {
      const row = document.createElement("tr");
      {
        const data = document.createElement("td");
        data.innerText = index.toString();
        row.appendChild(data);
      }
      const { indices } = surface;
      indices.forEach((i) => {
        const data = document.createElement("td");
        data.innerText = i.toString();
        row.appendChild(data);
      });
      createRowButtons(row, () => {
        refresh(removeSurface(index)(mesh));
      });
      triangleTable.appendChild(row);
    });
  }
};

drawTables(mesh);
