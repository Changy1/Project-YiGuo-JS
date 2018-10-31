define([''],function(){
    return{
        getCookie: function(key){
            var cookiestr = document.cookie;
            var list = cookiestr.split('; '); 
            for(var i =0; i<list.length;i++){
                var keystr=list[i].split('=');
                if (keystr[0]==key) return keystr[1];
            }
            return null;
            /*var res = list.filter(function(item){
                var kv = item.split('=');
                return kv[0] == key;
            })
            return res[0].split('=')[1];*/
        },
        setCookie: function(key,value,expires,path){
            switch(arguments.length){
                case 0 :
                case 1 : throw new Error('笨蛋，参数传错了，请重新再来一次！')
                case 2 : {
                    document.cookie = key + '=' + value;
                    break;
                }
                case 3 : {
                    var parem = arguments[2];
                    if( typeof parem == 'number'){
                        var d = new Date();
                        d.setSeconds(d.getSeconds()+parem);
                        document.cookie = key+'='+value+ '; expires=' + d;
                    }else if (typeof parem == 'string'){
                        document.cookie = key+'='+value+ '; path=' + parem;
                    }
                    break;
                }
                case 4 : {
                    var d = new Date();
                    d.setSeconds(d.getSeconds()+expires);
                    document.cookie = key+'='+value+ '; expires=' + expires + '; path=' + path;
                }
            }
        }
    }
})
