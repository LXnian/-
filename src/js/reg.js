function getReg() {
    $('#mainForm form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url: 'http://api.yuguoxy.com/api/member/add',
            type: 'post',
            data: {
                username:$('input[name="userN"]').val(),
                password:$('input[name="passW"]').val(),
                age:$('input[name="age"]').val(),
            },
            success: function (data) {
                if(data.resultCode==1){
                    alert('注册成功')
                    location.href='./login.html'
                }else{
                    alert('注册失败请重新输入信息')
                }
            }
        })
    })
   

}
getReg()