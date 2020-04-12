var tapspace = require('tapspace')
var goldenlion = require('./goldenlion.ejs')

module.exports = () => {
  // Tapspace-based website

  var SpaceGroup = tapspace.SpaceGroup
  var SpaceHTML = tapspace.SpaceHTML

  var space = new tapspace.Space()
  var view = new tapspace.SpaceView(space)
  view.mount(document.getElementById('space'))
  var lines = new SpaceGroup()
  lines.setParent(space)

  var RATIO = 0.9
  var prev = null
  var htmlLines = goldenlion({}).match(/[^\r\n]+/g)
  htmlLines.forEach(function (line, index) {
    var l = new SpaceHTML('<div>' + line + '</div>')
    l.setSize(468, 20)
    l.setParent(lines)
    // Sum of finite geometric series
    // var f = Math.round(30 * Math.pow(RATIO, index))
    // var y = Math.round(32 * (1 - Math.pow(RATIO, index)) / (1 - RATIO))
    var target = (prev === null) ? space.at(0, 0) : prev.atSW()
    l.scale(l.atNW(), Math.pow(RATIO, index))
    l.translate(
      [l.atNW()],
      [target]
    )
    prev = l
  })

  // Initial view position
  view.fitScale(lines)
  view.scale(lines.atMid(), 1.23)
  // Make the view transformable
  var viewtouch = new tapspace.Touchable(view, view)
  var viewwheel = new tapspace.Wheelable(view, view)
  viewtouch.start({ translate: true, scale: true, rotate: true, tap: true })
  viewwheel.start({ scale: true })
}

module.exports()
