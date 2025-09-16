import "./imageCarousel.css";

export class ImageCarousel {
  constructor(images, div) {
    this.images = images;
    this.div = div;
    this.div.className = "image-carousel";
    this.index = 0;
    this.imageWidth = 300;
    this.divWidth = this.images.length * this.imageWidth;
    this.x = window.innerWidth / 2 - this.imageWidth / 2;
    this.leftBoundary = this.imageWidth;
    this.rightBoundary = -(this.divWidth - this.imageWidth / 0.5);

    this.#loadImages();
    this.#loadButtons();this.#loadBullets();
    this.#updateBullet();
    this.#loop();
  }

  #loadImages() {
    const placeholder = document.createElement("div");
    placeholder.className = "images-div";
    placeholder.style.transform = `translateX(calc(50% - ${this.imageWidth / 2}px))`;

    for (let image of this.images) {
      const i = document.createElement("img");
      i.src = image;
      i.style.width = `${this.imageWidth}px`;
      placeholder.appendChild(i);
    }
    this.div.appendChild(placeholder);
  }

  #loadButtons() {
    const placeholder = document.createElement("div");
    placeholder.className = "buttons-div";

    const backBtn = document.createElement("button");
    backBtn.className = "back-btn";
    backBtn.addEventListener("click", () => {
      this.#moveLeft();
    });
    placeholder.appendChild(backBtn);

    const nextBtn = document.createElement("button");
    nextBtn.className = "next-btn";
    nextBtn.addEventListener("click", () => {
      this.#moveRight();
    });
    placeholder.appendChild(nextBtn);

    this.div.appendChild(placeholder);
  }

  #loadBullets() {
    const placeholder = document.createElement("div");
    placeholder.className = "bullets-div";
    for (let x = 0; x < this.images.length; x++) {
      const bullet = document.createElement("div");
      bullet.className = "bullet";
      bullet.value = x;
      bullet.addEventListener("click", (event) => {
        this.index = event.target.value;
        this.#updateBullet();
        this.x =
          window.innerWidth / 2 -
          this.imageWidth / 2 -
          this.index * this.imageWidth;
        document.querySelector(".images-div").style.transform =
          `translateX(${this.x}px)`;
      });
      placeholder.appendChild(bullet);
    }
    this.div.appendChild(placeholder);
  }

  #updateBullet() {
    const bullets = document.querySelectorAll(".bullet");
    console.log(bullets);
    for (let bullet of bullets) {
      bullet.style.backgroundColor = "gray";
    }
    bullets[this.index].style.backgroundColor = "blue";
  }

  #moveLeft() {
    if (this.x < this.leftBoundary) {
      this.x += this.imageWidth;
      document.querySelector(".images-div").style.transform =
        `translateX(${this.x}px)`;
      this.index -= 1;
      this.#updateBullet();
    }
  }

  #moveRight() {
    if (this.x - this.imageWidth > this.rightBoundary) {
      this.x -= this.imageWidth;
      document.querySelector(".images-div").style.transform =
        `translateX(${this.x}px)`;
      this.index += 1;
      this.#updateBullet();
    }
  }

  #loop() {
    setTimeout(() => {
      if (this.index >= this.images.length - 1) {
        this.index = -1;
        this.x = window.innerWidth / 2 - this.imageWidth / 2 + this.imageWidth;
      }
      this.#moveRight();
      this.#loop();
    }, 5000);
  }
}
