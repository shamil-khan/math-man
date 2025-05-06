import random from 'random';

class MathUtil {
  public static getRandomValue(min: number, max: number): number {
    const value = random.uniformInt(min, max)();
    // console.log(`random-value: ${value}`);
    return value;
  }
}

export default MathUtil;
