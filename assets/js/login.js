$(function () {
    //点击"去注册账号"的链接
    $('#link-red').on('click', function () {
        $('.login-box').hide()
        $('.red-box').show()
    })


    //点击'去登陆'的链接
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.red-box').hide()
    })


    //效验密码规则
    //cong layui中获取 form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义效验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //效验两次密码是否输入一致
        repwd: function (value) {
            var pwd = $('.red-box [name=password]').val()
            if (pwd != value) {
                return "两次输入密码不正确"
            }
        }
    })


    //监听注册的表单事件   注册功能
    $('#form-reg').on('submit', function (e) {
        e.preventDefault() //阻止默认行为

        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }

        // 发起ajax的post请求      好的代码一定是阅读性强的
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }

            layer.msg('注册成功,请进行登录!')

            //模拟用户点击操作
            $('#link-login').click()
        })
    })



    // 监听登录表单的提交事件
    $('#form-login').submit(function (e) {
        e.preventDefault() //阻止默认提交行为


        $.ajax({
            url: '/api/login',
            method: 'POST',

            //快速获取表单中的数据 
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layes.msg(res.message)
                }
                //将token 保存到本地
                localStorage.setItem('token', res.message)
                //跳转到后台主页
                location.href = './index.html'
            }
        })
    })
})  