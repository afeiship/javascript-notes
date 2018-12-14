var image = document.getElementById("pImg");

image.addEventListener("touchstart", inEvent => {
  const { touches } = inEvent;
  console.log(inEvent, touches);
});
image.addEventListener("touchmove", inEvent => {});
image.addEventListener("touchend", inEvent => {});
