function parseDuration(ms) {
  return {
    h: Math.floor(ms / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
    ms: ms % 1000,
  }
}

export function calcDuration(start, end) {
  return parseDuration(end - start)
}

export function sumDurations(durations) {
  const totalMs = durations.reduce((acc, { h, m, s, ms }) => {
    return acc + h * 3600000 + m * 60000 + s * 1000 + ms
  }, 0)

  return parseDuration(totalMs)
}

export function formatDuration(duration, withMs = false) {
  const { h, m, s, ms } = duration
  const parts = []

  if (h) parts.push(`${h}h`)
  if (m) parts.push(`${m}m`)
  if (s) parts.push(`${s}s`)
  if (withMs && ms) parts.push(`${ms}ms`)

  return parts.length > 1 ? parts.join(' : ') : parts.join(' ')
}

// For test
// const randomTime = [
//   { start: 1695271200000, end: 1695274800123 }, // 1h 0m 0s 123ms
//   { start: 1695278400000, end: 1695283200250 }, // 1h 20m 0s 250ms
//   { start: 1695286800000, end: 1695286800500 }, // 0h 0m 0s 500ms
//   { start: 1695290400000, end: 1695294000999 }, // 1h 0m 0s 999ms
//   { start: 1695297600000, end: 1695298200300 }, // 0h 10m 0s 300ms
//   { start: 1695301200000, end: 1695301500150 }, // 0h 5m 0s 150ms
//   { start: 1695304800000, end: 1695305700678 }, // 0h 15m 45s 678ms
//   { start: 1695308400000, end: 1695308500090 }, // 0h 0m 10s 90ms
//   { start: 1695312000000, end: 1695314400400 }, // 0h 40m 0s 400ms
//   { start: 1695315600000, end: 1695315870100 }, // 0h 4m 30s 100ms
//   { start: 1695319200000, end: 1695319350080 }, // 0h 0m 15s 80ms
//   { start: 1695322800000, end: 1695324000222 }, // 0h 20m 0s 222ms
//   { start: 1695325200000, end: 1695325650555 }, // 0h 7m 30s 555ms
//   { start: 1695328800000, end: 1695328800010 }, // 0h 0m 0s 10ms
//   { start: 1695332400000, end: 1695333000090 }, // 0h 10m 0s 90ms
//   { start: 1695336000000, end: 1695337200200 }, // 0h 20m 0s 200ms
//   { start: 1695338400000, end: 1695338950075 }, // 0h 5m 0s 75ms
//   { start: 1695342000000, end: 1695344400600 }, // 0h 40m 0s 600ms
//   { start: 1695345600000, end: 1695347400400 }, // 0h 30m 0s 400ms
//   { start: 1695349200000, end: 1695351000333 }, // 0h 30m 0s 333ms
//   { start: 1695352800000, end: 1695355200350 }, // 1h 20m 0s 350ms
// ]
