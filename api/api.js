import fetch from './axios'
import * as TYPE from './type'
export const Home = function() {
  return fetch({ url: TYPE.BASE })
}

export const Song = function(params) {
  return fetch({ url: TYPE.SONG_INFO, params })
}

export const Lyric = function(params) {
  return fetch({ url: TYPE.LYRIC, params })
}

export const Vkey = function(params) {
  return fetch({ url: TYPE.SONG_VKEY, params })
}
