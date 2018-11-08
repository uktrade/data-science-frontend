const fiveMins = (1000 * 60 * 5)

module.exports = function () {
  const date = new Date()
  if (date.getHours() < 8) {
    date.setTime(date.getTime() + fiveMins)
  } else {
    date.setHours(23, 59, 59, 0)
  }

  return {
    seconds: (date.getTime() / 1000),
    utc: date.toUTCString(),
  }
}
