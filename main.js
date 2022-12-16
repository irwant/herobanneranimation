gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray("section");

sections.forEach(section => {  
  let canvas = section.querySelector(".hero-mouse");
  canvas ? initCanvas(section, canvas) : initOther(section);
});

function initCanvas(section, canvas) {

  let text = section.querySelector(".tek");
  let textd = section.querySelector(".tekd");
  let context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;  
  
  

  let frameCount = 493;
  const currentFrame = index => (
    `sequence/${(index + 1).toString().padStart(4, '0')}.jpg`
  );

  let images = []
  let  mouse = {
    frame: 0
  };
  
  for (let i = 0; i < frameCount; i++) {
    let img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }
gsap.timeline({
    onUpdate: render,
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 2,
      end: "+=200%",
      
    }
  })
  .to(text,{
    opacity:0,
    duration: 0.5
    
  })
  .to(textd,{
    opacity:1,
    duration: 0.5

  })
  
  .to( mouse, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    duration: 1
  }, 0);
  
  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ mouse.frame], 0, 0); 
  }
}

function initOther(section) {
  ScrollTrigger.create({
    trigger: canvas,
    pin: true,
    end: "+=200%"
  });
}



