module.exports = function () {
  const date = new Date()
  const newDate = new Date()
  let delay

  if (date.getHours() < 8) {
    delay = 60 * 5
  } else {
    delay = Math.ceil(Math.abs((date.setHours(23, 59, 59, 0) - (newDate.getTime())) / 1000))
  }

  function getDelayedTime (dt, seconds) {
    return new Date(dt.getTime() + seconds * 1000)
  }

  return {
    seconds: delay,
    utc: getDelayedTime(newDate, delay).toUTCString(),
  }
}
