class CameraController extends AnimationObject {
  constructor() {
    super();
  }

  eventLoop() {}

  cameraHandleKeyDown(e) {
    this.handleKeyDown(e);
  }

  cameraHandleKeyUp(e) {
    this.handleKeyUp(e);
  }
}
