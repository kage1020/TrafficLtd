export const calcTime = (days: number, hours: number, minutes: number, seconds: number) => {
  return seconds + minutes * 60 + hours * 60 * 60 + days * 60 * 60 * 24
}

export const sleep = (time = 1000) => {
  setTimeout(() => {
    return
  }, time)
}
