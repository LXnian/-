"use strict";function returnIndex(){$(".logo button").on("click",function(){location.href="./index.html"})}returnIndex();var stateAll=!1;function showTable(){var t=localStorage.getItem("CART-LIST"),t=JSON.parse(t)||[],e=0,a=(t.forEach(function(t){t.singlePrice=(t.putaway*t.price).toFixed(2),e+=Number(t.singlePrice)}),$("h2 span").html("￥"+e.toFixed(2)),"\n        <table  cellspacing='0' cellpadding='30'>\n        <tr>\n            <th><input type='checkbox' name='choice' "+(stateAll?"checked":"")+">全选</th>\n            <th>商品图片</th>\n            <th>商品名</th>\n            <th>商品价格</th>\n            <th>商品数量</th>\n            <th>商品总价</th>\n            <th>操作</th>\n        </tr>"),t=t.map(function(t){return"<tr>\n            <td><input type='checkbox' name='single' data-id='"+t.id+"' "+(t.state?"checked":"")+'></td>\n            <td><img src="'+t.picture+'" alt=""></td>\n            <td>'+t.product+"</td>\n            <td>￥"+t.price+'</td>\n            <td><input type="button" name="minus" value="-" data-id=\''+t.id+"' "+(0==t.putaway?"disabled":"")+'>\n                <input type="text" name="amount" value=\''+t.putaway+'\'>\n                <input type="button" name="plus" value="+" data-id=\''+t.id+"'></td>\n            <td>￥"+t.singlePrice+'</td>\n            <td> <a href="#">移入收藏</a><br><a href="#" class="dele"  data-id=\''+t.id+"'>删除</a></td>\n        </tr>"}).join("");$(".cart-list").html(a+t+"</table>")}function all(){$(".cart-list").on("click",'input[name="plus"]',function(t){var e=localStorage.getItem("CART-LIST"),e=JSON.parse(e)||[],a=(t.target||t.srcElement).getAttribute("data-id");e.find(function(t){return t.id==a}).putaway++,localStorage.setItem("CART-LIST",JSON.stringify(e)),showTable()}),$(".cart-list").on("click",'input[name="minus"]',function(t){var e=localStorage.getItem("CART-LIST"),e=JSON.parse(e)||[],a=(t.target||t.srcElement).getAttribute("data-id");e.find(function(t){return t.id==a}).putaway--,localStorage.setItem("CART-LIST",JSON.stringify(e)),showTable()}),$(".cart-list").on("click",".dele",function(t){var e=localStorage.getItem("CART-LIST"),e=JSON.parse(e)||[],a=this.getAttribute("data-id"),n=e.findIndex(function(t){return t.id==a});e.splice(n,1),localStorage.setItem("CART-LIST",JSON.stringify(e)),showTable()}),$(".cart-list").on("click",'input[name="choice"]',function(){var t=localStorage.getItem("CART-LIST"),t=JSON.parse(t)||[];stateAll=!stateAll,t.forEach(function(t){return t.state=stateAll}),localStorage.setItem("CART-LIST",JSON.stringify(t)),showTable()}),$(".cart-list").on("click",'input[name="single"]',function(t){var e=localStorage.getItem("CART-LIST"),e=JSON.parse(e)||[],a=(t.target||t.srcElement).getAttribute("data-id"),t=e.find(function(t){return t.id==a}),t=(t.state=!t.state,e.every(function(t){return t.state}));stateAll=!!t,localStorage.setItem("CART-LIST",JSON.stringify(e)),showTable()})}showTable(),all();