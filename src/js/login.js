function getLogin() {
    $('#mainForm form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url: 'http://api.yuguoxy.com/api/member/login',
            type: 'post',
            data: {
                username:$('input[name="userN"]').val(),
                password:$('input[name="passW"]').val(),
            },
            success: function (data) {
                if(data.resultCode==1){
                    alert('登录成功')
                    localStorage.setItem('user', JSON.stringify(data.resultInfo))
                    location.href='./index.html'
                }else{
                    alert('登录失败请重新输入信息')
                }
            }
        })
    })

}
getLogin()