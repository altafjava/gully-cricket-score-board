class MathUtil {
  static getRandomNo() {
    const min = 100
    const max = 999
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

export default MathUtil
