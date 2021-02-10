const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const delay = () => {
  const ms = randomInteger(1550, 6250);
  return new Promise(resolve => setTimeout(resolve, ms, {data: ms}));
};

export default delay;
