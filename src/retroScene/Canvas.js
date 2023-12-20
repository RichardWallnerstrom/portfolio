export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('app2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.backgroundImages = [
      { src: '/assets/2d/background/parallax-forest-back-trees.png', speed: 0.1, x: 0, y: 0 },
      { src: '/assets/2d/background/parallax-forest-middle-trees.png', speed: 0.3, x: 0, y: 0 },
      { src: '/assets/2d/background/parallax-forest-front-trees.png', speed: 0.6, x: 0, y: 0 },
      { src: '/assets/2d/background/parallax-forest-lights.png', speed: 0.8, x: 0, y: 0 }
    ];
    this.loadImages();
  }

  loadImages() {
    let loadedImages = 0;

    const onLoad = () => {
      loadedImages++;
      if (loadedImages === this.backgroundImages.length) {
        console.log('All images loaded');
        this.draw();
      }
    };

    this.backgroundImages.forEach((imageObj) => {
      const image = new Image();
      image.src = imageObj.src;
      image.onload = onLoad;
      image.onerror = (error) => console.error(`Error loading image ${imageObj.src}:`, error);
      imageObj.image = image;
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

draw() {
  this.clearCanvas();

  // Draw the images with adjusted sizes to cover the entire canvas
  this.backgroundImages.forEach((imageObj) => {
    const { image, speed, x, y } = imageObj;

    // Calculate the scaling factors for width and height
    const scaleX = this.canvas.width / image.width;
    const scaleY = this.canvas.height / image.height;

    // Use the larger scaling factor to cover the whole canvas
    const scale = Math.max(scaleX, scaleY);

    // Update positions based on speed for parallax effect
    imageObj.x -= speed;

    // Wrap around the image to create a seamless loop
    if (imageObj.x <= -this.canvas.width) {
      imageObj.x = 0;
    }

    this.ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    this.ctx.drawImage(image, x + this.canvas.width, y, image.width * scale, image.height * scale);
  });
}

}
