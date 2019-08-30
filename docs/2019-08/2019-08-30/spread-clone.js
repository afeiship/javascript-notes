const bird = {
  type: 'pigeon',
  color: 'white'
};

const birdClone = {
  ...bird
};

console.log(birdClone); // => { type: 'pigeon', color: 'white' }
console.log(bird === birdClone); // => false

// ======== next ======

const laptop = {
  name: "MacBook Pro",
  screen: {
    size: 17,
    isRetina: true
  }
};
const laptopClone = {
  ...laptop
};

console.log(laptop === laptopClone); // => false
console.log(laptop.screen === laptopClone.screen); // => true
