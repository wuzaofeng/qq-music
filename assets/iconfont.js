;(function(window) {
  var svgSprite =
    '<svg><symbol id="icon-play" viewBox="0 0 1024 1024"><path d="M509.6 979.52c-257.76 0-467.52-209.76-467.52-467.52S251.84 44.48 509.6 44.48s467.52 209.76 467.52 467.52S767.36 979.52 509.6 979.52zM509.6 99.68c-227.52 0-412.32 184.8-412.32 412.32 0 227.52 184.8 412.32 412.32 412.32 227.52 0 412.32-184.8 412.32-412.32C921.92 284.48 737.12 99.68 509.6 99.68z"  ></path><path d="M685.76 548.48l-242.4 181.92c-24 18.24-43.68 8.16-43.68-22.08L399.68 323.36c0-30.24 19.68-40.32 43.68-22.08l242.4 181.92C709.76 500.96 709.76 530.24 685.76 548.48z"  ></path></symbol><symbol id="icon-pause" viewBox="0 0 1024 1024"><path d="M399.378125 313.86125c-22.055625 0-39.984375 17.94-39.984375 39.984375v316.2984375c0 22.0546875 17.934375 39.9890625 39.984375 39.9890625s39.984375-17.94 39.984375-39.9890625V353.845625c0-22.05-17.934375-39.984375-39.984375-39.984375z m225.249375 0c-22.05 0-39.99 17.94-39.99 39.984375v316.2984375c0 22.0546875 17.945625 39.9890625 39.99 39.9890625s39.97875-17.94 39.97875-39.9890625V353.845625c0-22.05-17.934375-39.984375-39.97875-39.984375zM511.994375 992C247.2884375 992 32 776.675 32 512S247.3203125 32 511.994375 32C776.669375 32 992 247.325 992 512c-0.0159375 264.675-215.330625 480-480.005625 480z m0-910.98C274.34375 81.02 81.02 274.353125 81.02 512s193.3378125 430.98 430.974375 430.98c237.6215625 0 430.985625-193.333125 430.985625-430.98S749.646875 81.02 511.994375 81.02z"  ></path></symbol></svg>'
  var script = (function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  })()
  var shouldInjectCss = script.getAttribute('data-injectcss')
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener('DOMContentLoaded', loadFn, false)
          fn()
        }
        document.addEventListener('DOMContentLoaded', loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }
    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
      var polling = function() {
        try {
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        init()
      }
      polling()
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }
  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }
  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }
  function appendSvg() {
    var div, svg
    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  ready(appendSvg)
})(window)
