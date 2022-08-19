class AnimationObjectInstructionHandler {
  constructor() {
    this.currKeysPressedArray = [];
    this.shotButtonPressed = false;
  }

  #addInstruction(e) {
    if (this.currKeysPressedArray.includes(e.keyCode) == false) {
      this.currKeysPressedArray.push(e.keyCode);
    }
  }

  #removeInstruction(e) {
    const keyCodePressedIndex = this.currKeysPressedArray.indexOf(e.keyCode);
    this.currKeysPressedArray.splice(keyCodePressedIndex, 1);
  }

  handleKeyDown(e) {
    this.#addInstruction(e);
  }

  handleKeyUp(e) {
    this.#removeInstruction(e);
  }
}
