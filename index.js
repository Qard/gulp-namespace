module.exports = function (gulp, sep) {
  if (gulp.namespace) {
    throw new Error('gulp.namespace already exists')
  }

  sep = sep || ':'
  var reg = new RegExp('^super\\' + sep)
  var namespaces = []

  gulp.namespace = function (ns, fn) {
    namespaces.push(ns)
    fn()
    namespaces.pop()
  }

  function getName (name) {
    var depth = namespaces.length
    while (reg.test(name)) {
      name = name.replace(reg, '')
      depth--
    }
    return namespaces.slice(0, depth).concat(name).join(sep)
  }

  shim(gulp, 'task', function (task) {
    return function (name, deps, fn) {
      if (Array.isArray(deps)) {
        deps = deps.map(getName)
      }
      return task.call(this, getName(name), deps, fn)
    }
  })
}

function shim (obj, meth, rep) {
  obj[meth] = rep(obj[meth])
}
