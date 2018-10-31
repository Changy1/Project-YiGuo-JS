require(['../../js/conf/config.js'],function(){
    require(['jquery','template','ajaxMapping','gsCookie'],function($,template,urlajax,myCookie){
        //先将公共头部插入
            $('.myhead').load('http://localhost:9000/pages/mypublichtml/myhead.html',function(){
        /* 公用左边栏插入 */
            $('.myleft').load('http://localhost:9000/pages/mypublichtml/myleft.html')
        //头部随滚轮滑动脱离跟随页面
        $(window).on('scroll',function(){
            if( $(window).scrollTop() > 90){
                $('.header').addClass('headerfix');
            }else{
                $('.header').removeClass('headerfix');
            }
        })
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

        //商品列表的ajax请求
        $('#listalll').load('http://localhost:9000/pages/templates/listall.html',function(){
            var flagaja = true;
            $(window).on('scroll',function(){
                if(flagaja){
                    if($(window).scrollTop()>150){
                        $.ajax({
                            url: urlajax.myjson,
                            success: function(data){
                                var htmlstr = template('listall',{
                                    list: data
                                });
                                $('#uL').html(htmlstr);
                                $('#uL2').css('display','block');
                                var flaglist= true;
                                //添加一个懒加载事件
                                $(window).on('scroll',function(){
                                    if($(window).scrollTop()>900 && flaglist){
                                        $.ajax({
                                            url: urlajax.myjson,
                                            success: function(data){
                                                var htmlstr2 = template('listall',{
                                                    list: data
                                                });
                                                $('#uL2').html(htmlstr2);
                                                $('#uL2').find('.fly').on('click',myclick);
                                            }
                                        })
                                    }
                                })
                                //商品点击加入购物车产生cookie然后飞入
                                $('.fly').on('click',myclick); 
                                function myclick(){
                                    //飞入
                                    var $new = $(this).parent().parent().children().eq(0).find('img').clone();
                                    $new.css({
                                        'z-index': '800',
                                        display: 'block',
                                        position: 'absolute',
                                        top:  $(this).parent().parent().offset().top,
                                        left:  $(this).parent().parent().offset().left,
                                    })
                                    $('body').append($new);
                                    $new.animate({height: '50px', width: '50px'},function(){
                                        $new.animate({top: $('#cart').offset().top,left: $('#cart').offset().left},1000,function(){
                                            $new.fadeOut(function(){
                                                $new.remove();
                                            });
                                        })
                                    })


                                    //cookie生成
                                    var _imgsrc = $(this).parent().parent().children().eq(0).find('img').attr('src');
                                    var _name = $(this).parent().parent().children().eq(1).find('a').html();
                                    var _onenum = $(this).parent().parent().children().eq(1).find('strong').html();
                                    var _gg = '一份';
                                    var _count = 1;
                                    
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
                                }
                            }
                        })
                        flagaja = false;
                    }
                }
            })
        })

    })
})