require(['../../js/conf/config.js'],function(){
    require(['jquery','template','ajaxMapping','gsCookie'],function($,template,urlajax,myCookie){
        $('#shopping').load('http://localhost:9000/pages/templates/shoppingtr.html',function(){ 
            //拿出cookie并调用字符串模板
            var list_str = myCookie.getCookie('list');
            if(list_str){
                list = JSON.parse(list_str);
                list.forEach(item => {
                    var htmlstr = template('shoppingtr',{
                        list : item        
                    })
                    $('#table').html($('#table').html()+htmlstr);

                    //首先计算一次每一栏的总价
                    $('.top-all').each(function(){
                        var one = parseFloat($(this).parent().parent().children().eq(4).find('a').html());
                        var num = $(this).parent().parent().children().eq(5).find('input').val();
                        $(this).html((one*num).toFixed(2));
                    })
                    //首先先计算一次总价
                        var lastnum = 0;
                        $('.top-all').each(function(){
                            if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                                lastnum += parseFloat($(this).html());
                            }
                        })
                        $('#last-all').html(lastnum.toFixed(2));

                    //购物车部分的增加减少按钮事件
                    $('.btn-').on('click',function(){
                        var $input = $(this).parent().children().eq(1);
                        var $onenum = $(this).parent().parent().parent().children().eq(4).find('a');
                        var $allnum = $(this).parent().parent().parent().children().eq(6).find('span');
                        var num = parseInt( $input.val() );
                        var onenum = parseFloat($onenum.html());
                        if($input.val()!=1){
                            $input.val(num-1);
                        }
                        $allnum.html((parseInt($input.val()) * onenum).toFixed(2));
                        //每次点击都要计算一次最终价格
                        var lastnum = 0;
                        $('.top-all').each(function(){
                            if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                                lastnum += parseFloat($(this).html());
                            }
                        })
                        $('#last-all').html(lastnum.toFixed(2))
                    })
                    $('.btnadd').on('click',function(){
                        var $input = $(this).parent().children().eq(1);
                        var $onenum = $(this).parent().parent().parent().children().eq(4).find('a');
                        var $allnum = $(this).parent().parent().parent().children().eq(6).find('span');
                        var num = parseInt( $input.val() );
                        var onenum = parseFloat($onenum.html());
                        $input.val(num+1);
                        $allnum.html((parseInt($input.val()) * onenum).toFixed(2));
                        var lastnum = 0;
                        $('.top-all').each(function(){
                            if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                                lastnum += parseFloat($(this).html());
                            }
                        })
                        $('#last-all').html(lastnum.toFixed(2))
                    })

                //全选事件
                //如果中间全选了那么全选也改变
                    $('.one-check').on('click',function(){
                        var flag = $('.one-check').is(function(){
                            return !$(this).prop('checked')                 //只要有一个没选中 那他就返回true,如果全选中了那全是false返回false          
                        })
                        if(!flag){
                            $('.all-check').prop('checked',true);
                        }else{
                            $('.all-check').prop('checked',false);
                        }
                        var lastnum = 0;
                        $('.top-all').each(function(){
                            if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                                lastnum += parseFloat($(this).html());
                            }
                        })
                        $('#last-all').html(lastnum.toFixed(2))
                    })
                    $('.all-check').on('click',function(){
                        if($(this).prop('checked')){
                            $('input').prop('checked',true);
                        }else{
                            $('input').prop('checked',false);
                        }
                        var lastnum = 0;
                        $('.top-all').each(function(){
                            if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                                lastnum += parseFloat($(this).html());
                            }
                        })
                        $('#last-all').html(lastnum.toFixed(2))
                    })

                //删除事件
                //单个删除
                    $('.remove').on('click',function(){
                        $(this).parent().parent().remove();
                        //每次点击都要计算一次最终价格
                        var lastnum = 0;
                        $('.top-all').each(function(){
                            if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                                lastnum += parseFloat($(this).html());
                            }
                        })
                        $('#last-all').html(lastnum.toFixed(2))
                    })

                });
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
        
        
        //删除选中的
            $('.remove-chek').on('click',function(){
                $('.one-check').each(function(){
                    if($(this).prop('checked')){
                        $(this).parent().parent().remove();
                    }
                })
                //每次点击都要计算一次最终价格
                var lastnum = 0;
                $('.top-all').each(function(){
                    if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                        lastnum += parseFloat($(this).html());
                    }
                })
                $('#last-all').html(lastnum.toFixed(2))
            })
        //清空购物车
        $('#all-remove').on('click',function(){
            $('.alert-list').find('tr').remove();
            //每次点击都要计算一次最终价格
            var lastnum = 0;
            $('.top-all').each(function(){
                if($(this).parent().parent().children().eq(0).find('input').prop('checked')){
                    lastnum += parseFloat($(this).html());
                }
            })
            $('#last-all').html(lastnum.toFixed(2))
        })

        //特惠换购栏懒加载
        $('#sales').load('http://localhost:9000/pages/templates/Salestxt.html',function(){
            var flagsale = true;
            $(window).on('scroll',function(){
                if($(window).scrollTop() - $('.perferential').offset().top > -200){
                    $.ajax({
                        url: urlajax.myjson,
                        success: function(data){
                            var htmlstr = template('salestxt',{
                                list: data
                            })
                            $('#saleUl').html(htmlstr);
                        }
                    })
                    flagsale = false;
                }
            })
        })


    })
})