


let animationObjectsArray = [];
const animate = () => {
    animationObjectsArray.forEach(object => {
        console.log(object.name);
    });

    window.requestAnimationFrame(animate);
  };
  animate();