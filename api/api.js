import fetch from './axios'
import * as TYPE from './type'
// 首页
export const Home = function() {
  return fetch({ url: TYPE.HOME })
}

// 热门歌单信息 + 歌单列表
export const Song = function(params) {
  return fetch({ url: TYPE.SONG_INFO, params })
}

// 热门歌单列表 音乐地址
export const SongSrc = function(data) {
  return fetch({ url: TYPE.SONG_SRC, data, method: 'post' })
}

// 歌词
export const Lyric = function(params) {
  return fetch({ url: TYPE.LYRIC, params })
}

// 获取电台歌单列表
export const Radio = function(data) {
  return fetch({ url: TYPE.Radio, data, method: 'post' })
}

// 获取排行榜
export const Ranking = function() {
  return fetch({ url: TYPE.Ranking })
}

// 获取排行榜详情
export const RankingInfo = function(data) {
  return fetch({ url: TYPE.Ranking_INFO, data, method: 'post' })
}

// 获取排行榜列表的信息
export const RankingDetails = function(data) {
  return fetch({ url: TYPE.Ranking_Details, data, method: 'post' })
}
