class CameraController extends AnimationObject {
  constructor() {
    super();
  }

  #moveCameraWithShip() {
    -shipController.currXVal / 10 - cameraCenter,
      -shipController.currYVal / 1.2 - 1165,
      0,
      myMap;
  }

  eventLoop() {
    if (this.currKeysPressedArray.includes(38 || 37 || 39)) {
      moveCameraWithShip;
    }
  }

  cameraHandleKeyDown(e) {
    this.handleKeyDown(e);
  }

  cameraHandleKeyUp(e) {
    this.handleKeyUp(e);
  }
}
