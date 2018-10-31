require(['../../js/conf/config.js'],function(){
    require(['jquery','template','ajaxMapping','gsCookie'],function($,template,urlajax,myCookie){
    //先将公共头部插入
         $('.myhead').load('http://localhost:9000/pages/mypublichtml/myhead.html',function(){
    /* 公用左边栏插入 */
         $('.myleft').load('http://localhost:9000/pages/mypublichtml/myleft.html')
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
                        //购物车特有划出消失
                        $('.left-other').css('display','none');
                    })
                    //这是购物车页面特有的隐藏出现事件
                    $('.left-other').on('mouseenter',function(){
                        //购物车特有划入显示
                        $('.left-other').css('display','block');
                    })
                    $('.left-all').on('mouseenter',function(){
                        //购物车特有划入上面部分显示
                        $('.left-other').css('display','block');
                    })
                    $('.left-all').on('mouseleave',function(){
                        //购物车特有划出上面部分消失
                        $('.left-other').css('display','none');
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
    });
        //商品大图的淡入淡出
        $('.small').on('mouseenter',function(){
            $('.bigimg').eq($(this).index()).fadeIn().siblings().fadeOut();
        })

        //商品数量加减操作
        $('.bn-').on('click',function(){
            if($('.input-num').val()>1){
                var num = parseInt($('.input-num').val());
                $('.input-num').val(num-1);
            }
        })
        $('.bnadd').on('click',function(){
            var num = parseInt($('.input-num').val());
            $('.input-num').val(num+1);
        })

        //商品规格选事件
        $('.choose-a').on('click',function(){
            $('#place').fadeOut();
            //改变class
            $(this).addClass('hot').parent().siblings().children().removeClass('hot');
            $('.go').css('display','block');
            //改变按钮事件
            $('#have').css('background','#008842');
            $('#have').css('cursor','pointer');
            $('#have').html('<i></i>加入购物车');
        })

        //Top按钮点击和隐藏事件
        $(window).on('scroll',function(){
            if( $(window).scrollTop() > 100){
                $('.sidebar-bottom').css('display','block');
            }else{
                $('.sidebar-bottom').css('display','none');
            }
        })
        $('.sidebar-bottom').on('click',function(){
            $('html,body').animate({scrollTop: 0},500);
        })



        //购买事件 生成cookie
        $('#have').on('click',function(){
            //先判断规格里面有没有被选中的，有的话再开始添加cookie事件
            var flag = $('.choose-a').is(function(){
                return this.className == 'choose-a hot'
            })
            var index = null; 
            $('.choose-a').each(function(){
                if(this.className == 'choose-a hot'){
                    index = $(this).parent().index();
                }
            })
            if(flag){
                var _imgsrc = $('.bigimg').eq(0).attr('src');
                var _name = $('#shoppname').html();
                var _onenum = $('.guige').eq(index).find('.span1').html();
                var _gg = $('.guige').eq(index).find('.span2').html();
                var _count = $('.input-num').val();

                var obj = {
                    'src' : _imgsrc,
                    'name' : _name,
                    'oneprice' : _onenum,
                    'type' : _gg,
                    'count' : _count
                }
                var list_str = myCookie.getCookie('list');
                if(!list_str){
                    var list = [];                          //如果之前没有list那么就创建一个list
                }else{
                    var list = JSON.parse(list_str);        //如果之前有，那么先把他变成数组
                }
                //遍历他
                var isExist = list.some(function(item){
                    //这里判断是否有名字相同，type也相同的如果有那么数量加一
                    var res = (item.name == obj.name && item.type == obj.type);
                    if(res)  item.count = parseInt(item.count)+parseInt(obj.count) + '';
                    //返回一个布鲁类型
                    return res;
                })
                //这里是如果没有那么就把这个对象加到list里面
                if(!isExist) list.push(obj);
                //更新list cookie
                myCookie.setCookie('list',JSON.stringify(list),7*24*3600,'/');

                //图片飞入购物车事件
                var $new = $('#bclone').clone();
                $new.css({
                    display: 'block',
                    position: 'absolute',
                    top: $('#offset').offset().top,
                    left: $('#offset').offset().left,
                })
                $('body').append($new);
                $new.animate({height: '50px', width: '50px'},function(){
                    $new.animate({top: $('#cart').offset().top,left: $('#cart').offset().left},1000,function(){
                        $new.fadeOut(function(){
                            $new.remove();
                        });

                    })
                })
            }
        })

        //当季热卖模板字符串你的插入
        $('#hotbuy').load('http://localhost:9000/pages/templates/shoppingli.html',function(){
            var flaghot = true;
            $(window).on('scroll',function(){
                if($(window).scrollTop()>100 && flaghot){
                    $.ajax({
                        url: urlajax.myjson,
                        success: function(data){
                            var htmlstr = template('shoppingli',{
                                list : data
                            })
                            $('#hotUl').html(htmlstr);
                        }
                    })
                    flaghot = false;
                }
            })
        
        })

        //底部点击事件
        $('.click-one').on('click',function(){
            $(this).parent().addClass('active').siblings().removeClass('active');
            $('#none1').css('display','block');
            $('#none2').css('display','none');
        })

        $('.click-two').on('click',function(){
            $(this).parent().addClass('active').siblings().removeClass('active');
            $('#none1').css('display','none');
            $('#none2').css('display','block');
        })


        //猜你喜欢模板插入和滚动事件
        $('#likeyou').load('http://localhost:9000/pages/templates/youlike.html',function(){
            var flaglike = true;
            $(window).on('scroll',function(){
                if($(window).scrollTop()>150){
                    $.ajax({
                        url: urlajax.myjson,
                        success: function(data){
                            var htmlstr = template('youlike',{
                                list: data
                            })
                            $('.lovelist').html(htmlstr);
                        }
                    })
                    flaglike = false;
                }
            })
        })

        //评论模板字符串的插入
        $('#comment').load('http://localhost:9000/pages/templates/ourcomment.html',function(){ 
            var flag = true;
            $(window).on('scroll',function(){
                if($(window).scrollTop()>650 && flag){
                    $.ajax({
                        url: urlajax.comment,
                        dataType: 'json',
                        success: function(data){//不能在这里改变flag，因为ajax是异步，不会立即回调，请求也需要时间
                                                //如果在这里那么第一次请求的过程中又会请求好多次，直到第一次执行回调
                        //根据数据多少判断要显示多少页 
                            var num = parseInt(data.comBO.length / 6);    
                        //分割数据，让他6个一组6个一组
                            var oldarr = [];
                            for(var i=0; i<data.comBO.length;i++){
                                if( i%6 ==0 ){
                                    if( i!= 0){
                                        oldarr.push(newarr);
                                    }
                                    var newarr = [];
                                }
                                newarr.push(data.comBO[i]);
                                if( i == data.comBO.length-1){
                                    oldarr.push(newarr);
                                }
                            }

                        //然后循环这个新的分组分别根据模板产生不同的页面放入一个数组
                            for(var i=0; i<oldarr.length; i++){
                                var $new = $('<div>');
                                $new.addClass('comment-bottom'+i);
                                var htmlstr = template('ourcomment',{
                                    list: oldarr[i]
                                })
                                $new.html(htmlstr);
                            //将除了第一页之外的隐藏
                                if(i!=0){
                                    $new.css('display','none');
                                }
                                $('.comment-bottom').append($new);
                            }
                        //让loding样式消失
                            $('#looood').css('display','none');
                        
                        
                        //分页换页栏出现
                            $('.paging').css('display','block');       
                            for(var i=0; i<num+1 ; i++){
                                $('.that').eq(i).css('display','block');
                            }
                        //给分页按钮添加点击事件
                            $('.that').on('click',function(){
                                $(this).addClass('this').siblings().removeClass('this');
                                var $index = $(this).index()-1;
                                $('.comment-bottom'+$index).css('display','block').siblings().css('display','none');
                                $('html,body').animate({scrollTop: $('.product').offset().top});
                            })
                        //上一页按钮
                            $('#up').on('click',function(){
                                //这里index要去掉上一页这个按钮
                                var $index = $('.this').index()-1;
                                //当他不是第一页的时候
                                if($index>0){
                                    $index--;
                                    $('.that').eq($index).addClass('this').siblings().removeClass('this');
                                    $('.comment-bottom'+$index).css('display','block').siblings().css('display','none');
                                    $('html,body').animate({scrollTop: $('.product').offset().top});
                                }
                            })
                        //下一页按钮
                            $('#down').on('click',function(){
                                var $index = $('.this').index()-1;
                                if($index < num){
                                    $index++;
                                    $('.that').eq($index).addClass('this').siblings().removeClass('this');
                                    $('.comment-bottom'+$index).css('display','block').siblings().css('display','none');
                                    $('html,body').animate({scrollTop: $('.product').offset().top});
                                }
                            })



                        }
                    }) 
                    flag = false;       //请求一次之后滚动事件就不会再请求
                }
            })

        })

    })
});