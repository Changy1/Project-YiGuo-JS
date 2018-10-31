

define([], function() {
    return{
        'citylist':'http://localhost:9000/proxy/www.yiguo.com/Handler/InitLayOut?r=0.1324678319514665&_=1536836291476',
        'search':function(val){
           return `http://search.yiguo.com/ajax/fullsearch.ashx?datestamp=1536841788751&term=${val}&jsoncallback=jQuery17208120355048892056_1536841783674&_=1536841788753`
        },
        'commodity': function(val,num){
            return `http://localhost:9000/proxy/m.zol.com/index.php?c=Shop_IndexV2&a=AjaxGetGoods&pos=${val}&page=${num}`
        },
        'comment': 'http://localhost:9000/proxy/comm.xiu.com/mobile/list?prodId=26982968&brandId=7832549&searchType=0&pageType=0&catgCode=0&pageNo=5&pageSize=15',
        'myjson': 'http://localhost:9000/proxy/pages/json/mylist.json',
        'indexjson': 'http://localhost:9000/proxy/pages/json/indexbuy.json'
    }  
});