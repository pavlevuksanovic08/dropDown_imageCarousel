export class DropDownMenu {
  constructor(button, div) {
    this.button = button;
    this.div = div;

    this.div.style.display = "none";

    this.#handle();
  }

  #handle() {
    this.button.addEventListener("mouseenter", () => {
      this.div.style.display = "block";
    });
    this.button.addEventListener("mouseleave", () => {
      this.div.style.display = "none";
    });
    this.div.addEventListener("mouseenter", () => {
      this.div.style.display = "block";
    });
    this.div.addEventListener("mouseleave", () => {
      this.div.style.display = "none";
    });
  }
}
