require(['../../js/conf/config.js'],function(){
    require(['jquery','template','ajaxMapping','gsCookie'],function($,template,urlajax,myCookie){
        //输入的时候如果不为空那么背景为白色，如果是空那么背景为黄色
        $('.input-js').on('input',function(){
            if($(this).val() == ''){
                $(this).css('background','rgb(250, 255, 189)');
            }else{
                $(this).css('background','white');
            }
        })
        //验证码的随机生成
        $('#next').on('click',function(){
            var num = '';
            var color =''+ Math.floor(Math.random()*230)+','+Math.floor(Math.random()*230)+','+Math.floor(Math.random()*230);
            for(var i=0; i<4; i++){
                do{
                    numone = Math.floor(Math.random()*(122-48)+48);
                }while(!( (numone>=48&&numone<=57) || (numone>=65&&numone<=90) || (numone>=97&&numone<=122) ))
                num += String.fromCharCode(numone);
            }
            $('.yzm').html(num);
            $('.yzm').css('color','rgb('+color+')');
        })

        //获取cookie 然后判断登陆是否正确
        var username = myCookie.getCookie('username');
        console.log(username);
        var password = myCookie.getCookie('password');
        console.log(password);
        $('#go-success').on('click',function(){
            var flag1 = ($('#input-username').val() == username);
            var flag2 = ($('#input-password').val() == password);
            var flag3 = ($('#input-yzm').val() ==  $('.yzm').html());
            if( flag1 && flag2 && flag3){
                window.location.href = 'http://localhost:9000/';
            }else{
                if(!flag1){
                    alert('该用户名不存在');
                } 
                if(!flag2){
                    alert('密码错误');
                }
                if(!flag3){
                    alert('验证码不正确');
                }
            }
        })
    })
});