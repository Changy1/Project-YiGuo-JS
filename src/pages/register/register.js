require(['../../js/conf/config.js'],function(){
    require(['jquery','template','ajaxMapping','gsCookie'],function($,template,urlajax,myCookie){
	document.cookie = 'i"m your father';
        //随机生成四位数字字母组合的验证码
        $('#next').on('click',function(){
            var num = '';
            var color =''+ Math.floor(Math.random()*230)+','+Math.floor(Math.random()*230)+','+Math.floor(Math.random()*230);
            for(var i=0; i<4; i++){
                do{
                    numone = Math.floor(Math.random()*(122-48)+48);
                }while(!( (numone>=48&&numone<=57) || (numone>=65&&numone<=90) || (numone>=97&&numone<=122) ))
                num += String.fromCharCode(numone);
            }
            $('.yzm-text').html(num);
            $('.yzm-text').css('color','rgb('+color+')');
        })
        //表单验证
        //手机号只能是数字
        var regphone = /^[0-9]+$/;
        $('#input-iphone').on('focusout',function(){
            if(!regphone.test($('#input-iphone').val())){
                $('#iphone-span').css('display','inline-block');
            }else{
                $('#iphone-span').css('display','none');
            }
        }) 
        //验证码必须是六位的数字
        var regyzm = /^[0-9]{6}$/;
        $('#input-yzm').on('focusout',function(){
            if(!regyzm.test($('#input-yzm').val())){
                $('#yzm-span').css('display','inline-block');
            }else{
                $('#yzm-span').css('display','none');
            }
        }) 
        //密码必须是字母开头，且只包含数字字母下划线
        var regpassword = /^[a-zA-Z]\w{5,19}$/;
        $('#input-password').on('focusout',function(){
            if(!regpassword.test($('#input-password').val())){
                $('#password-span').css('display','inline-block');
            }else{
                $('#password-span').css('display','none');
            }
        }) 
        //确认密码两次必须相同
        $('#passwordtwo').on('focusout',function(){
            if($(this).val() != $('#input-password').val()){
                $('#passwordtwo-span').css('display','inline-block');
            }else{
                $('#passwordtwo-span').css('display','none');
            }
        }) 

        //勾选同意以后立即注册变为绿色
        $('#agreeyes').on('click',function(){
            if($('#agreeyes').prop('checked')){
                $('.success').css('background','rgb(0,136,66)');
            }else{
                $('.success').css('background','grey');
            }
        })

        //立即注册生成cookie，但首先判断所有input都合格
        $('#go-success').on('click',function(){
            var flag1 = $('.error').is(function(){
                return $(this).css('display') == 'inline-block';    //这里只要有一个还在显示那么flag就是true，就不能注册
            })
            var flag2 = $('.kong').is(function(){                   //只要有一个input是空的就不能注册
                return $(this).val() == '';
            })
            var flag3 = ($('.input-img').val() == $('.yzm-text').html());  //判断验证码是否正确
            var flag4 = $('#agreeyes').prop('checked');                     //判断条款是否同意
            //当所有条件都符合的时候就可以注册啦
            if(!flag1 && !flag2 && flag3 && flag4){
                var username = $('#input-iphone').val();
                var password = $('#input-password').val();
                myCookie.setCookie('username',username,7*24*3600,'/');
                myCookie.setCookie('password',password,7*24*3600,'/');
                window.location.href = "http://localhost:9000/pages/login/login.html";
            }else{
                alert('请正确填写！(除邀请码外必须填写、填写正确验证码、还有别忘记勾选同意条框哦！)')
            }
        })

    })
});