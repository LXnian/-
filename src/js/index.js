//导航栏样式切换
function onNav() {
    $('#nav ul').on('click', 'li', function () {
        $('#nav ul li').removeClass('active')
        $(this).addClass('active')
    })
}
onNav()

//首页列表切换
function onli() {
    $('#main .banner>ul').on('mouseover', 'li', function () {
       
        $('#main ul li').removeClass('liHover')
        $(this).addClass('liHover')
        //菜单显示
        $('.menu').css('display', 'block')
    })
    $('#main ul').on('mouseout', 'li', function () {
        $(this).removeClass('liHover')
        $('.menu').css('display', 'none')
    })
    $('#main .banner>ul').on('click', 'li', function () {
        let id=$(this).attr('data-id')
        $.ajax({
            url: 'http://api.yuguoxy.com/api/shop/list/category',
            type: 'get',
            data: {
                categoryId: id,
            },
            success: function (data) {
                $('#main .list ul').empty()
                let dataList = data.resultInfo.list
                cartList(dataList)
            }
        })
    })

}
onli()
//购物车跳转
$('.top button').on('click', function () {
    location.href = './cart.html'
})
//搜索功能
function getSearch() {
    $('.search button').on('click', function () {
        $.ajax({
            url: 'http://api.yuguoxy.com/api/shop/search',
            type: 'get',
            data: {
                keyword: $('.search input').val(),
            },
            success: function (data) {
                if (data.resultCode == 1) {
                    let getSearchList = data.resultInfo.list
                    $('#main .list ul').empty()
                    cartList(getSearchList)
                } else if (data.resultCode == -1) {
                    $('#main .list ul').html("未找到任何数据")
                }

            }

        })
    })

}
getSearch()
//登录头像请求
function getHeadImg() {
    let headerImgObj = JSON.parse(localStorage.getItem('user'))
    if (headerImgObj == null) {
        return
    } else {
        headerImg = headerImgObj.headerimg
        $('#main .nine img').prop('src', headerImg)
    }

}
getHeadImg()
//请求轮播数据
function getSwiper() {
    $.ajax({
        url: 'http://api.yuguoxy.com/api/shop/banner',
        type: 'get',
        data: {},
        success: function (data) {
            let list = data.resultInfo.list
            let url = list.map(item => {
                return `<div class="swiper-slide"><img src="${item.url}" alt=""></div>`
            }).join('')
            $('.swiper-wrapper').html(url)
            new Swiper('.swiper', {
                direction: 'horizontal', // 垂直切换选项
                loop: true, // 循环模式选项
                autoplay: {
                    delay: 1000,
                },
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    hideOnClick: true,
                },
            })

        }
    })

}
getSwiper()
//请求商品列表数据
function getData(pageNo) {
    $.ajax({
        url: 'http://api.yuguoxy.com/api/shop/list',
        type: 'get',
        data: {
            pageNo,
            pageSize: 8
        },
        success: function (data) {
            let list = data.resultInfo.list
            cartList(list)
        }
    })

}
getData(1)
//商品详情
function detail(id) {
    location.href = './detail.html?id=' + id
}
//动态渲染列表
function cartList(list) {

        let newList = list.map(item => {
            return `<li onclick="detail(${item.id})">
                        <img src="${item.picture}" alt="">
                        <div class="bottom">
                            <div class="one">${item.shop}</div>
                            <div class="label">
                                <div>淘宝</div>
                                <div>包邮</div>
                            </div>
                            <div class="pricelabel">
                                <div class="price">￥${item.price}</div>
                                <div class="num">${item.oldprice}人已买</div>
                                <div class="lab">${item.categoryname}</div>
                            </div>
                        </div>
                    </li>`
        }).join('')
        $('#main .list ul').append(newList)
  
}
//加载更多
function btnMore() {
    let pageNo = 1
    $('.list>button').on('click', function () {
        getData(++pageNo)
    })
}
btnMore()