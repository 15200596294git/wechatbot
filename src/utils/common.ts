export function createRandomSelector(array: any[]) {
  return function () {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
}