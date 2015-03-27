# gulp-namespace

This is handy helper lets you automagically namespace all tasks and task references within the supplied callback. This is useful for things like inheriting the tasks from a dependency gulpfile, without clobbering your own.

```
var namespace = require('gulp-namespace')
var gulp = require('gulp')
namespace(gulp)

gulp.namespace('some-dependency', function () {
  require('some-dependency/gulpfile')
})
```
