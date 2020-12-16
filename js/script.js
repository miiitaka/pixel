(() => {
  let
    canvas,
    ctx,
    image,
    imageData;

  const CANVAS_SIZE = 500;

  window.addEventListener("load", () => {
    document.getElementById("normal").addEventListener("click", () => {
      render();
    });
    document.getElementById("invert").addEventListener("click", () => {
      render();
      ctx.putImageData(invertFilter(imageData), 0, 0);
    });

    imageLoader("./images/sample1.jpg", (loadedImage) => {
      image = loadedImage;
      initialize();
      render();
    });
  });

  const initialize = () => {
    canvas = document.body.querySelector("#main_canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    ctx = canvas.getContext("2d");
  };

  const render = () => {
    ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };

  const imageLoader = (path, callback) => {
    let target = new Image();

    target.addEventListener("load", () => {
        callback(target);
    });
    target.src = path;
  };

  const invertFilter = (imageData) => {
    let width = imageData.width;
    let height = imageData.height;
    let data = imageData.data;
    let out = ctx.createImageData(width, height);

    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j) {
        let index = (i * width + j) * 4;
        out.data[index] = 255 - data[index];
        out.data[index + 1] = 255 - data[index + 1];
        out.data[index + 2] = 255 - data[index + 2];
        out.data[index + 3] = data[index + 3];
      }
    }
    return out;
  };
})();
