//返回首页
function returnIndex(){
    $('.logo button').on('click',function(){
        location.href='./index.html'
    })
}
returnIndex()
//定义全选框状态
let stateAll = false
//渲染表格
function showTable() {
    let productListStr = localStorage.getItem('CART-LIST')
    let productList = JSON.parse(productListStr) || []
    //计算总价 
    var totalPrice = 0
    productList.forEach(item => {
        item.singlePrice = (item.putaway * item.price).toFixed(2)
        totalPrice = totalPrice + Number(item.singlePrice)
    })
    $('h2 span').html(`￥${totalPrice.toFixed(2)}`)
    //动态渲染
    let th = `
        <table  cellspacing='0' cellpadding='30'>
        <tr>
            <th><input type='checkbox' name='choice' ${stateAll?'checked':''}>全选</th>
            <th>商品图片</th>
            <th>商品名</th>
            <th>商品价格</th>
            <th>商品数量</th>
            <th>商品总价</th>
            <th>操作</th>
        </tr>`
    let newTr = productList.map(item => {
        return `<tr>
            <td><input type='checkbox' name='single' data-id='${item.id}' ${item.state?'checked':''}></td>
            <td><img src="${item.picture}" alt=""></td>
            <td>${item.product}</td>
            <td>￥${item.price}</td>
            <td><input type="button" name="minus" value="-" data-id='${item.id}' ${item.putaway==0?'disabled':''}>
                <input type="text" name="amount" value='${item.putaway}'>
                <input type="button" name="plus" value="+" data-id='${item.id}'></td>
            <td>￥${item.singlePrice}</td>
            <td> <a href="#">移入收藏</a><br><a href="#" class="dele"  data-id='${item.id}'>删除</a></td>
        </tr>`
    }).join('');
    $('.cart-list').html(th + newTr + `</table>`)
}
showTable()

//功能实现
function all() {

    //商品加一
    $('.cart-list').on('click', 'input[name="plus"]', function (e) {
        let productListStr = localStorage.getItem('CART-LIST')
        let productList = JSON.parse(productListStr) || []
        let target = e.target || e.srcElement
        let id = target.getAttribute('data-id')
        let product = productList.find(item => item.id == id)
        product.putaway++
        localStorage.setItem('CART-LIST', JSON.stringify(productList))
        showTable()
    })
    //商品减一
    $('.cart-list').on('click', 'input[name="minus"]', function (e) {
        let productListStr = localStorage.getItem('CART-LIST')
        let productList = JSON.parse(productListStr) || []
        let target = e.target || e.srcElement
        let id = target.getAttribute('data-id')
        let product = productList.find(item => item.id == id)
        product.putaway--
        localStorage.setItem('CART-LIST', JSON.stringify(productList))
        showTable()
    })
    //删除商品
    $('.cart-list').on('click', '.dele', function (e) {
        let productListStr = localStorage.getItem('CART-LIST')
        let productList = JSON.parse(productListStr) || []
        let id = this.getAttribute('data-id')
        let index = productList.findIndex(item => item.id == id)
        productList.splice(index, 1)
        localStorage.setItem('CART-LIST', JSON.stringify(productList))
        showTable()
    })
    // // 全选框
    $('.cart-list').on('click', 'input[name="choice"]', function () {
        let productListStr = localStorage.getItem('CART-LIST')
        let productList = JSON.parse(productListStr) || []
        stateAll = !stateAll
        productList.forEach(item => item.state = stateAll)
        localStorage.setItem('CART-LIST', JSON.stringify(productList))
        showTable()
    })
    // //单选框
    $('.cart-list').on('click', 'input[name="single"]', function (e) {
        let productListStr = localStorage.getItem('CART-LIST')
        let productList = JSON.parse(productListStr) || []
        let target = e.target || e.srcElement
        let id = target.getAttribute('data-id')
        let product = productList.find(item => item.id == id)
        product.state = !product.state
        let bl = productList.every(item => item.state)
        bl ? stateAll = true : stateAll = false
        localStorage.setItem('CART-LIST', JSON.stringify(productList))
        showTable()
    })
}
all()

