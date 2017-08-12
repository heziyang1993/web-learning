## gulp demo 

```
//自动编译
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('completeSass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass({outputStyle:'expanded'}))
	// .pipe(rename(function(path){
	// 	path.dirname = path.dirname.replace('/sass','css')
	// }))
	.pipe(gulp.dest('./src/css'))
})

// 合并js文件
// var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('buildJs',function(){
	// 匹配js文件
	gulp.src('./src/js/*.js')

	// 合并成单个文件
	// .pipe(concat('all.js'))

	// 输出
	// .pipe(gulp.dest('./dist/js'))

	// 压缩
	.pipe(uglify({mangle:false}))

	// 改名
	.pipe(rename({suffix:'.min'}))

	.pipe(gulp.dest('dist/js/'))
});


//浏览器同步插件
var browserSync = require('browser-sync');

gulp.task('server',function(){
// 	browserSync({
// 		// 设置服务器路径(静态服务器)
// 		server:'./src',

// 		// 服务器端口
// 		//port:8888,

// 		// 代理
// 		// proxy:'http://localhost:2000',

// 		// 监听文件修改，自动刷新
// 		files:['./src/**/*.html','./src/css/*.css']
// 	});

	// 监听sass修改
	gulp.watch('./src/sass/*.scss',['completeSass']);
});
```