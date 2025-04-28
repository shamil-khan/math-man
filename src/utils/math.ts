import random from 'random';

function getRandomValue(min: number, max: number) {
  const value = random.uniformInt(min, max)();
  console.log(`value: ${value}`);
  return value;
}

export default getRandomValue;
