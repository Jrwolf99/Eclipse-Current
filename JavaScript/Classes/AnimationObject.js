class AnimationObject {
  constructor() {
    this.currKeysPressedArray = [];
  }

  #addInstruction(e) {
    if (this.currKeysPressedArray.includes(e.keyCode) == false) {
      this.currKeysPressedArray.push(e.keyCode);
      console.log(this.currKeysPressedArray);
    }
  }

  #removeInstruction(e) {
    console.log(this.currKeysPressedArray);

    const keyCodePressedIndex = this.currKeysPressedArray.indexOf(e.keyCode);
    this.currKeysPressedArray.splice(keyCodePressedIndex, 1);

    console.log(this.currKeysPressedArray);
  }

  handleKeyDown(e) {
    this.#addInstruction(e);
  }

  handleKeyUp(e) {
    this.#removeInstruction(e);
  }
}
