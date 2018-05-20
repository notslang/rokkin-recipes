'use strict'

var store = function (key, data) {
  return window.localStorage.setItem(key, JSON.stringify(data))
}

var load = function (key) {
  var data = window.localStorage.getItem(key)
  return JSON.parse(data)
}

export {store, load}
