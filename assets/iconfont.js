!(function(a) {
  var e,
    s =
      '<svg><symbol id="icon-play" viewBox="0 0 1024 1024"><path d="M509.6 979.52c-257.76 0-467.52-209.76-467.52-467.52S251.84 44.48 509.6 44.48s467.52 209.76 467.52 467.52S767.36 979.52 509.6 979.52zM509.6 99.68c-227.52 0-412.32 184.8-412.32 412.32 0 227.52 184.8 412.32 412.32 412.32 227.52 0 412.32-184.8 412.32-412.32C921.92 284.48 737.12 99.68 509.6 99.68z"  ></path><path d="M685.76 548.48l-242.4 181.92c-24 18.24-43.68 8.16-43.68-22.08L399.68 323.36c0-30.24 19.68-40.32 43.68-22.08l242.4 181.92C709.76 500.96 709.76 530.24 685.76 548.48z"  ></path></symbol><symbol id="icon-time" viewBox="0 0 1024 1024"><path d="M512 563.2h179.2a25.6 25.6 0 0 1 0 51.2h-204.8a25.4976 25.4976 0 0 1-25.6-25.6v-256a25.6 25.6 0 0 1 51.2 0V563.2z m396.288 129.024a25.6 25.6 0 0 1-46.592-21.248 384 384 0 1 0-114.688 144.7424 25.6 25.6 0 0 1 31.3344 40.448 435.2 435.2 0 1 1 129.8944-163.9936z" fill="#9DA7B2" ></path></symbol><symbol id="icon-pause" viewBox="0 0 1024 1024"><path d="M399.378125 313.86125c-22.055625 0-39.984375 17.94-39.984375 39.984375v316.2984375c0 22.0546875 17.934375 39.9890625 39.984375 39.9890625s39.984375-17.94 39.984375-39.9890625V353.845625c0-22.05-17.934375-39.984375-39.984375-39.984375z m225.249375 0c-22.05 0-39.99 17.94-39.99 39.984375v316.2984375c0 22.0546875 17.945625 39.9890625 39.99 39.9890625s39.97875-17.94 39.97875-39.9890625V353.845625c0-22.05-17.934375-39.984375-39.97875-39.984375zM511.994375 992C247.2884375 992 32 776.675 32 512S247.3203125 32 511.994375 32C776.669375 32 992 247.325 992 512c-0.0159375 264.675-215.330625 480-480.005625 480z m0-910.98C274.34375 81.02 81.02 274.353125 81.02 512s193.3378125 430.98 430.974375 430.98c237.6215625 0 430.985625-193.333125 430.985625-430.98S749.646875 81.02 511.994375 81.02z"  ></path></symbol><symbol id="icon-search" viewBox="0 0 1024 1024"><path d="M880 848l-192-192c48-57.6 76.8-128 76.8-208 0-176-144-320-320-320S128 272 128 448s144 320 320 320c80 0 153.6-28.8 208-76.8l192 192c3.2 3.2 9.6 6.4 16 6.4s12.8-3.2 16-6.4c9.6-12.8 9.6-25.6 0-35.2z m-432-128c-150.4 0-272-121.6-272-272S297.6 176 448 176s272 121.6 272 272-121.6 272-272 272z"  ></path></symbol></svg>',
    t = (e = document.getElementsByTagName('script'))[
      e.length - 1
    ].getAttribute('data-injectcss')
  if (t && !a.__iconfont__svg__cssinject__) {
    a.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState))
        setTimeout(e, 0)
      else {
        var t = function() {
          document.removeEventListener('DOMContentLoaded', t, !1), e()
        }
        document.addEventListener('DOMContentLoaded', t, !1)
      }
    else
      document.attachEvent &&
        ((n = e),
        (o = a.document),
        (i = !1),
        (c = function() {
          i || ((i = !0), n())
        }),
        (s = function() {
          try {
            o.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(s, 50)
          }
          c()
        })(),
        (o.onreadystatechange = function() {
          'complete' == o.readyState && ((o.onreadystatechange = null), c())
        }))
    var n, o, i, c, s
  })(function() {
    var e, t, n, o, i, c
    ;((e = document.createElement('div')).innerHTML = s),
      (s = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (n = t),
        (o = document.body).firstChild
          ? ((i = n), (c = o.firstChild).parentNode.insertBefore(i, c))
          : o.appendChild(n))
  })
})(window)
