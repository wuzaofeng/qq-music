export function formatCount(value) {
  return value > 10000 ? `${(value / 10000).toFixed(1)}万` : value
}

export function formatLyric(lyric) {
  return lyric.replace(/&#(\d+);/g, (str, match) => String.fromCharCode(match))
}
