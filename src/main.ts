import p5 from "p5";
import Colour, { colours } from "./Mesh/Colour";
import Mesh from "./Mesh/Mesh";
import { vec } from "./Mesh/Vector";
import sketch from "./view/sketch";

const mesh = new Mesh();
{
  const p0 = mesh.addVertex(vec(-100, -100, 0));
  const p1 = mesh.addVertex(vec(100, -100, 0));
  const p2 = mesh.addVertex(vec(100, 100, 0));
  const p3 = mesh.addVertex(vec(-100, 100, 0));
  const p4 = mesh.addVertex(vec(0, 0, 100));
  mesh.addTrangle([p0, p3, p1]);
  mesh.addTrangle([p1, p3, p2]);
  mesh.addTrangle([p0, p1, p4]);
  mesh.addTrangle([p3, p0, p4]);
  mesh.addTrangle([p2, p3, p4]);
  mesh.addTrangle([p1, p2, p4]);
}

const config = {
  fill: colours.blue,
  stroke: { colour: colours.black, weight: 5 },
  normals: { colour: new Colour(128, 128, 128), weight: 5, size: 20 },
  vertices: { colour: colours.red, size: 5 },
};
new p5(sketch({ rotate: false, axes: true })(config, mesh));

const createRowButtons = (row: HTMLTableRowElement) => {
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
      createRowButtons(row);
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
      createRowButtons(row);
      triangleTable.appendChild(row);
    });
  }
};

drawTables(mesh);
