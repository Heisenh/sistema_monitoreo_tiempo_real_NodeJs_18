
const getNumRandom = (limit, init) => {
  const numRamdon = (Math.random() * (limit - init) + init).toFixed(1);
  return parseFloat(numRamdon);
}

export default getNumRandom;
