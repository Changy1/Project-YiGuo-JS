let gulp = require('gulp');            
let minifyJS = require('gulp-babel-minify'); 
let minifyCSS = require('gulp-clean-css');   
let connect = require('gulp-connect');   
let sass = require('gulp-sass');

gulp.task('build',function(){
    gulp.src('./src/**/*.js')            
    .pipe(minifyJS())                    
    .pipe(gulp.dest('./dist')) 

    gulp.src('./src/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'))           

    gulp.src('./src/**/*.html')               
    .pipe(gulp.dest('./dist'))               

    gulp.src('./src/**/*.scss')                 
    .pipe(sass({
        outputStyle: 'expanded'
    })).on('error',sass.logError)
    .pipe(gulp.dest('./dist')) 
})



//热处理HTML文件
gulp.task('refreshHTML',function(){             
    gulp.src('./src/**/*.html')                
    .pipe(gulp.dest('./dist'))                 
    .pipe(connect.reload());                   
})
//热处理JS文件
gulp.task('refreshJS',function(){              
    gulp.src('./src/**/*.js')
    .pipe(minifyJS())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
})
//热处理css文件
gulp.task('refreshCSS',function(){              
    gulp.src('./src/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
})
//热处理scss文件
gulp.task('refreshSCSS',function(){                     
    gulp.src('./src/**/*.scss')
    .pipe(sass({
        outputStyle: 'expanded'
    })).on('error',sass.logError)
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist')) 
    .pipe(connect.reload());
})
//有代理的服务器
gulp.task('connect',function(){                
    connect.server({
        root: 'dist',
        port: 9000,
        livereload: true,
        middleware: function (connect, opt) {
          var Proxy = require('gulp-connect-proxy');
          opt.route = '/proxy';
          var proxy = new Proxy(opt);
          return [proxy];
        }
    });
})
gulp.watch('./src/**/*.html',['refreshHTML']);            
gulp.watch('./src/**/*.js',['refreshJS','refreshHTML']);   
gulp.watch('./src/**/*.css',['refreshCSS','refreshHTML']);    
gulp.watch('./src/**/*.scss',['refreshSCSS','refreshHTML']); 
   