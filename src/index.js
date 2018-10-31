require(['js/conf/config.js'],function(){
    require(['jquery','template','ajaxMapping','gsCookie'],function($,template,urlajax,myCookie){
        $(function(){
        //先将公共头部插入
        $('.myhead').load('http://localhost:9000/pages/mypublichtml/myhead.html',function(){
        //根据cookie改变头部的样式
            if(myCookie.getCookie('username')){
                $('.register').css('display','none');
                $('.login').css('display','none');
                $('.logname').html(myCookie.getCookie('username'));
            }else{
                $('.logout').css('display','none');
                $('.logname').css('display','none');
            }
        //退出按钮的功能删除cookie
            $('.logout').on('click',function(){
                myCookie.setCookie('username','',-7*24*3600,'/');
                $('.logout').css('display','none');
                $('.logname').css('display','none');
                $('.register').css('display','block');
                $('.login').css('display','block');
            })
        //北京按钮划入划出事件
            //北京划入事件
            $('#topin').on('mouseenter',function(){
                $('#beijing').addClass('hover').children().addClass('sh'); 
                $('#city').css('display','block');
            });
            //北京划出事件
            $('#topin').on('mouseleave',function(){
                $('#beijing').removeClass('hover').children().removeClass('sh');
                $('#city').css('display','none'); 
            });

        //我的易果划入划出事件
            //我的易果划入
            $('#myyiguo').on('mouseenter',function(){
                $('#myyiguotop').addClass('hover').children().eq(1).addClass('sh');
                $('#myyiguodiv').css('display','block');
            });
            //我的易果划出
            $('#myyiguo').on('mouseleave',function(){
                $('#myyiguotop').removeClass('hover').children().eq(1).removeClass('sh');
                $('#myyiguodiv').css('display','none');
            });

        //手机易果划入划出事件
            //手机易果划入
            $('#mobile').on('mouseenter',function(){
                $('#mobiletop').addClass('hover').children().eq(1).addClass('sh');
                $('#mobilediv').css('display','block');
            });
            //手机易果划出
            $('#mobile').on('mouseleave',function(){
                $('#mobiletop').removeClass('hover').children().eq(1).removeClass('sh');
                $('#mobilediv').css('display','none');
            });

        //城市模块的信息ajax请求
            $.ajax({
                url: urlajax.citylist,
                dataType: 'json',
                success: function(data){
                //城市信息ajax动态获取
                    //将城市信息字符串模板插入
                    $('#citytext').load('http://localhost:9000/pages/templates/citytext.html',function(){
                        var htmlstr = template('allCity',{
                            hot : data.HotCity,             //热门城市信息
                            cityList1: data.City1,          //第一组城市信息
                            cityList2: data.City2,          //……
                            cityList3: data.City3,
                            cityList4: data.City4,
                            cityList5: data.City5,
                        })
                        $('#city').html(htmlstr);
                        //城市模块英文字母选择划入划出
                        $('.city-tab>span').on('mouseenter',function(){
                            //记录当前划入的字母下标
                            var index = $(this).index();
                            $(this).addClass('active').siblings().removeClass('active');
                            //随着字母模块的改变城市模块隐藏或出现
                            $('.citylist').eq(index).addClass('activetwo').siblings().removeClass('activetwo');
                        })
                    })

                //输入框下热门信息动态获取
                    //将信息字符串模板插入
                    $('#inputbottom').load('http://localhost:9000/pages/templates/inputbottom.html',function(){
                        var htmlstr = template('hotname',{
                            list : data.KeyWords        //关键字信息
                        })
                        $('.search-bottom').html(htmlstr);
                    })

                //左边栏菜单信息图片动态获取
                    //将左边栏字符串模板插入
                    $('#lefttext').load('http://localhost:9000/pages/templates/leftnavtext.html',function(){
                        var htmlstr = template('leftnavtext',{
                            list : data.Catrgories
                        })
                        $('.left-other').html(htmlstr);
                        //左边栏划入划出事件
                        $('.item').on('mouseenter',function(){
                            $('.sub-item').css('display','none');
                            $(this).children().eq(1).css('display','block');
                            $(this).siblings().children().children().removeClass('current');
                            $(this).children().eq(0).children().addClass('current');
                        })
                        //划出整个左边栏的时候
                        $('.left-other').on('mouseleave',function(){
                            $(this).children().children().children().removeClass('current');
                            $('.sub-item').css('display','none');
                        })
                    })

                }
            })
             //搜索框获得焦点事件
             $('#input').on('focus',function(){
                if($(this).val()=='输入商品名／编号／拼音'){
                    $(this).val('');
                }
                $(this).css({background:'white',color: '#444'});
            })
        //搜索框失去焦点事件
            $('#input').on('focusout',function(){
                if($(this).val()==''){
                    $(this).val('输入商品名／编号／拼音');
                    $(this).css({background:'#e0e0e0',color: '#999'});
                }else{
                    $(this).css('background','#e0e0e0');
                }
            })
        //搜索框的jsonp请求
            $('#input').on('input',function(){
                var scp = document.createElement('script');
                scp.src = urlajax.search(this.value);
                document.body.appendChild(scp);
            })
            window.jQuery17208120355048892056_1536841783674 = function(value){
                $('#hide').html('');
                value.forEach(val => {
                    var $li = $('<li>');
                    $li.html(val);
                    $('#hide').prepend($li);
                    $('#hide').css('display','block');
                    $li.on('click',function(){
                        $('#input').val($(this).html());
                        $('#hide').css('display','none');
                    })
                });
            }
        })
        //商品模块jsonp动态请求 
        //当滚轮滑动到指定距离，那么就加载当前模块的json信息
        //先给每一层设置一个key自定义属性为0，当他请求过一次以后就会变为1
        $('.floor-wrap').each(function(){
            $(this).attr('key','0');
        })
        $(window).on('scroll',function(){
            $('.floor-wrap').each(function(){
            //记录下标
                var $this = $(this);
                var $thisIndex = $(this).index();
            //当距离符合条件 并且它的key属性不等于1的时候才会执行ajax请求
                if( $(window).scrollTop()-$(this).offset().top > -300 && $(window).scrollTop()-$(this).offset().top < 200 && $(this).attr('key')!='1'){
                //第一次执行请求改变自定义属性key让他等于1
                    $(this).attr('key','1');
                    var val = $thisIndex%3; //因为只有三组数据，所以让他跟3取余算出他要用第几组
                    $.ajax({
                        url: urlajax.indexjson,
                        success:function(data){
                            //拆分这组数据
                            var newdata = [];
                            for(var i=0;i<data.length;i++){
                                if(i%7==0){
                                    if(i!=0){
                                        newdata.push(newarr);
                                    }
                                    var newarr = [];    
                                }
                                newarr.push(data[i]);
                                //因为没有21所以第三组数据需要当他等于20的时候存入
                                //这个时候data[20]已经放入了
                                if(i==data.length-1){
                                    newdata.push(newarr);
                                }
                            }
                            $('#commdity-text').load('http://localhost:9000/pages/templates/commditytext.html',function(){
                                var htmlstr = template('commditytext',{
                                    list : newdata[val] //这里根据他和3的余数就算出了他需要第几组数据
                                })
                                $this.find('.floor-con').html(htmlstr);
                            })
                        }
                    })
                }
            })
        })
            


        //轮播广告
        //轮播函数
            var imgIndex = 0;
            function change(){
                $('.slider-li').eq(imgIndex).css('display','block').siblings().css('display','none');
                $('.slider-li').eq(imgIndex).children().addClass('sliderhot').end().siblings().children().removeClass('sliderhot');
                $('.select').eq(imgIndex).addClass('hot').siblings().removeClass('hot');
            }
            change();
            //定时器在这里一定要先加再执行
            //一是为了外部调用这一次，二是为了底部导航和左右按钮的划入划出再次开启
            //当他再次开启的时候定时器首次执行为下一个图片
            var timer = setInterval(function(){
                imgIndex >2 ? imgIndex = 0 : imgIndex++; //0 1 2 3
                change();
            },5000)
        //轮播图底部导航栏的划入划出事件
            $('.select').on('mouseenter',function(){
                $(this).addClass('hot').siblings().removeClass('hot');
                clearInterval(timer);
                imgIndex = $(this).index(); //3
                change();
            }) 
            //划入关闭划出开启定时器
            $('.select').on('mouseleave',function(){
                timer = setInterval(function(){
                    imgIndex >2 ? imgIndex = 0 : imgIndex++; //0 1 2 3
                    change();
                },5000)
            })
        //轮播图左右按钮的事件
            $('.slider').on('mouseenter',function(){
                $('.slider-btn').find('a').stop().animate({opacity: 0.5},500);
            })
            $('.slider').on('mouseleave',function(){
                $('.slider-btn').find('a').stop().animate({opacity: 0},500);
            })
        //移入按钮关闭定时，移出开启
            $('.slider-btn').find('a').on('mouseenter',function(){
                clearInterval(timer);
                $('.slider-btn').find('a').stop().animate({opacity: 1},500);
            })
            $('.slider-btn').find('a').on('mouseleave',function(){
                $('.slider-btn').find('a').stop().animate({opacity: 0.5},500);
                timer = setInterval(function(){
                    imgIndex >2 ? imgIndex = 0 : imgIndex++; //0 1 2 3
                    change();
                },5000)
            })
        //点击事件左右按钮
            $('.prev').on('click',function(){
                imgIndex--;
                imgIndex < 0? imgIndex=3 : imgIndex;
                change();
            })
            $('.next').on('click',function(){
                imgIndex++;
                imgIndex > 3 ? imgIndex=0 : imgIndex;
                change();
            })
        

        //头部随滚轮滑动脱离跟随页面
            $(window).on('scroll',function(){
                if( $(window).scrollTop() > 90){
                    $('.header').addClass('headerfix');
                }else{
                    $('.header').removeClass('headerfix');
                }
            })

        //Top按钮点击和隐藏事件
            $(window).on('scroll',function(){
                if( $(window).scrollTop() > 400){
                    $('.sidebar-bottom').css('display','block');
                }else{
                    $('.sidebar-bottom').css('display','none');
                }
            })
            $('.sidebar-bottom').on('click',function(){
                $('html,body').animate({scrollTop: 0},500);
            })
        //楼层引导随滚轮滑动改变事件
            $(window).on('scroll',function(){
            //滑动隐藏显示事件
                if($(window).scrollTop() < 600){
                    $('.guide').fadeOut();
                }else{
                    $('.guide').fadeIn();
                }
            //随滑动引导自动变化样式事件
                $('.guide-a').each(function(){
                    var $top = $('.floor-wrap').eq($(this).index()).offset().top - $(window).scrollTop();
                    if( $top>-220 && $top < 230 ){
                        $(this).find('em').fadeIn();
                    }else{
                        $(this).find('em').fadeOut();
                    }
                })
            })
        
        //楼层引导的点击事件
            $('.guide-a').on('click',function(){
                var $top = $('.floor-wrap').eq($(this).index()).offset().top - 200;
                $('html,body').stop().animate({scrollTop: $top},500);
            })  

        })
    })
})