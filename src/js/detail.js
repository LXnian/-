function getProductId() {
    //http://127.0.0.1:5500/code/week7/day5/detail.html?id=50
    let url = location.href
    let params = url.substring(url.indexOf('?') + 1) //id=50
    let paramsArr = params.split('=') //['id','50']
    return paramsArr[1]
}

/**
 * 获取详情数据商品
 */
var liData

function getProductDetail() {
    let id = getProductId()
    $.ajax({
        method: 'get',
        url: 'http://api.yuguoxy.com/api/shop/find',
        data: {
            id
        },
        success: function (data) {
            showProductDetail(data.resultInfo)
            addCart(data.resultInfo)
        }
    })

}
//渲染商品详情
function showProductDetail(productDetail) {
    let liStr = productDetail.list.map(item => {
        return `<li><img src="${item}" alt=""></li>`
    }).join('')
    let leftStr = ` <div class="show">
                        <img src="${productDetail.picture}" alt="" class='big'>
                        <div class="mask"></div>
                     </div>
                    <ul class='small'>${liStr}</ul>`
    let rightStr = `<div class="bigshow">
                        <img src="${productDetail.picture}" alt="" class='big'>
                    </div>
                    <h2>${productDetail.shop}</h2>
                    <p class='productName'>${productDetail.product}</p>
                    <p class='price'>价格：<span>￥${productDetail.price}</span></p>`
    let rightColor = ` <img src="${ productDetail.list[0]}" alt="">`
    let rightColortwo = ` <img src="${ productDetail.list[1]}" alt="">`
    $('#main .left').html(leftStr)
    $('#main .right .top').html(rightStr)
    $('#main .right .bottom .choiceone').html(rightColor)
    $('#main .right .bottom .choicetwo').html(rightColortwo)
    $('#detailpage').html(`<p>商品详情</p><img src="${liStr}" alt="">`)

    let glass1 = new Glass('#main')
    glass1.onGlass()
    glass1.onTab()
    productNum()
}

//商品数量
function productNum() {
    //商品加一
    $('#main .right .bottom .num').on('click', 'input[name="plus"]', function () {
        let numValue = $('#main .right .bottom .num input[name="amount"]').val()
        $('#main .right .bottom .num input[name="amount"]').val(++numValue)
        $('#main .right .bottom .num input[name="amount"]').val() == '0' ? '' : $('#main .right .bottom .num input[name="minus"]').removeAttr('disabled')

    })
    //商品减一
    $('#main .right .bottom .num').on('click', 'input[name="minus"]', function (e) {
        let numValue = $('#main .right .bottom .num input[name="amount"]').val()
        $('#main .right .bottom .num input[name="amount"]').val(--numValue)
        $('#main .right .bottom .num input[name="amount"]').val() == '0' ? $(this).attr('disabled', 'true') : ''
    })
}
//放大镜
class Glass {
    constructor(id) {
        this.rootEle = document.querySelector(id)
        //遮罩层
        this.mask = this.rootEle.querySelector('.mask')
        //显示盒子showbox
        this.showBox = this.rootEle.querySelector('.show')
        //放大镜盒子glassBox
        this.glassBox = this.rootEle.querySelector('.bigshow')
        //背景图片bigPic
        this.bigPic = this.rootEle.querySelector('.bigshow>img')
        //所有选项目
        this.lis = this.rootEle.querySelectorAll('li')
    }
    /**
     * 调整比例
     *   遮罩层          glassBox
     *   -----   =  ------------
     *   showBox        bigPic
     *    
     *   bigPicWidth = glassBoxW*showBoxW/遮罩层
     */
    setScale() {
        let bigPicWidth = parseInt(this.showBox.clientWidth * this.glassBox.clientWidth / this.mask.clientWidth)
        let bigPicHeight = parseInt(this.showBox.clientHeight * this.glassBox.clientHeight / this.mask.clientHeight)

        this.bigPic.style.width = bigPicWidth + 'px'
        this.bigPic.style.height = bigPicHeight + 'px'
    }

    /**
     * 放大镜核心功能
     *   遮罩层随光标在showBox盒子中移动，放大镜中背景移之移动
     *     1. showBox盒子中移动事件
     */
    onGlass() {
        let _this = this

        this.showBox.addEventListener('mouseover', function (e) {
            _this.glassBox.style.display = 'block'
            _this.mask.style.display = 'block'
            _this.setScale() //遮罩层显示时计算宽高
        })
        this.showBox.addEventListener('mousemove', function (e) {
            e = e || window.event
            let x = e.offsetX - _this.mask.clientWidth / 2
            let y = e.offsetY - _this.mask.clientHeight / 2
            //边界查检
            if (x < 0) {
                x = 0
            }
            if (x > _this.showBox.clientWidth - _this.mask.clientWidth) {
                x = _this.showBox.clientWidth - _this.mask.clientWidth
            }
            if (y < 0) {
                y = 0
            }
            if (y > _this.showBox.clientHeight - _this.mask.clientHeight) {
                y = _this.showBox.clientHeight - _this.mask.clientHeight
            }

            _this.mask.style.left = x + 'px'
            _this.mask.style.top = y + 'px'

            //移动大背景图片
            /**
                 x         maskW
               ----   =  -------- 
               moveX       glassBoxW
               moveX = x * glassBoxW / maskW

             */

            let moveX = x * _this.glassBox.clientWidth / _this.mask.clientWidth
            let moveY = y * _this.glassBox.clientHeight / _this.mask.clientHeight


            _this.bigPic.style.left = -moveX + 'px'
            _this.bigPic.style.top = -moveY + 'px'
        })

        this.showBox.addEventListener('mouseout', function (e) {
            _this.mask.style.display = 'none'
            _this.glassBox.style.display = 'none'
        })
    }

    /**
     * 切换
     *   1.设置选中效果 active
     *   2. 遍历所有选项，绑定事件
     *       2.1 清除所有选项样式
     *       2.2 当前选项设置样式
     */
    onTab() {
        $('.small').on('click', 'img', function () {
            $('.show img').prop('src', $(this).prop('src'))
            $('.bigshow>img').prop('src', $(this).prop('src'))

        })
    }
}

function getbigBox() {
    $('.show').hover(function () {
        $('.bigshow').prop('display', 'block')
    })
}
getbigBox()
//加入购物车
function addCart(productDetail) {
    $('.add-cart').on('click', function () {
        let tab
        let id = getProductId()
        let cartList = JSON.parse(localStorage.getItem('CART-LIST')) || [];
        cartList.forEach(item => {
            if (item.id == id) {
                item.putaway = Number(item.putaway )+ Number($('#main .right .bottom .num input[name="amount"]').val())
                tab=1
            } 
        })
        if(tab==1){
            localStorage.setItem('CART-LIST', JSON.stringify(cartList))
        }else {
            cartList.push(productDetail)
            localStorage.setItem('CART-LIST', JSON.stringify(cartList))
        }
        location.href='../pages/cart.html'
    })
}
getProductDetail()