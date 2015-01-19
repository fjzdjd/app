/*
* author cjj
* date 2015/1/15
* */
(function(){
    $(function(){
        //app入口
        var app = {
            init:function(){//初始化
                this.bindEvent();
            },
            bindEvent:function(){
                $.ui.ready(function(){
                    $("#afui").get(0).className='ios7';
                }); //设置属于那种风格
            }
        };
        app.init();

        var login = {
            $loginBtn:$('#loginBtn'),
            $form:$('#loginForm'),
            init:function(){
                this.bindEvent();
            },
            bindEvent:function(){
                var _this = this;
                _this.$loginBtn.click(function(){
                    $.post('http://open.iot.10086.cn/login/index',_this.$form.serialize(),function(res){
                        alert(res);
                    });
                });
            }
        }
        login.init();
    });
})();