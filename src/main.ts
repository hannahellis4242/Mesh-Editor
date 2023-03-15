const load = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }
  const context = canvas.getContext("2d");
  if (!context) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }
  const imgData = context.createImageData(2000, 100);
  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i + 0] = (i - 128) % 256;
    imgData.data[i + 1] = i % 256;
    imgData.data[i + 2] = (i + 128) % 256;
    imgData.data[i + 3] = 255;
  }
  context.putImageData(imgData, 10, 10);
};

load();
