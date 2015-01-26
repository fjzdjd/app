/*
* author cjj
* date 2015/1/15
* */
(function(){
    $(function(){
        //app入口
        $.ui.animateHeaders = false;
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

        var loginStorage = {//登录模块、需要用户信息请求模块
            $tocken:localStorage.tocken,
            $username:localStorage.username,
            $password:localStorage.password,
            $loginBtn:$('#loginBtn'),
            $form:$('#loginForm'),
            $exit:$('.exit'),
            init:function(){
                this.checkSuport();
                this.bindEvent();
                console.log(this.$exit);
            },
            bindEvent:function(){
                var _this = this;
                $('#loginBtn').click(function(){
                    _this.submitLogin();
                });
                $('.exit').click(function(){
                    _this.exitLogin();

                });
            },
            checkSuport:function(){//检查是否支持本地存储
                if(!window.localStorage){
                    alert('您的系统不支持本地存储，无法为您保存用户信息');
                }
            },
            checkTocken:function(){//检查tocken是否存在，当请求需要发送用户信息时需要调用此函数
                if(this.$tocken && this.$tocken != 'undefined' && this.$tocken != ''){
                    return this.$tocken;
                }else if(this.$password && this.$username){
                    this.login();
                }else{
                    this.returnLoginPage();
                }
            },
            returnLoginPage:function(){
                $.ui.loadContent("#login", false, false, "pop");
                if(this.$username){
                    $("#username").val(this.$username);
                }
            },
            requestFailedCallback:function(){//当需要发送用户信息的请求请求失败时调用此函数，一般是tocken失效或过期
                if(this.$password && this.$username){
                    this.login();
                }else{
                    this.returnLoginPage();
                }
            },
            getRequestData:function(){//获得请求数据
                return {
                    name:this.$username,
                    pass:this.$password
                }
            },
            login:function(){
                var _this = this;
                var data = _this.getRequestData();
                $.post('http://open.iot.10086.cn/login/index',data,function(res){
                    alert(res.code);
                    if(res.code == 0){
                        if(res.data){
                            var tocken = res.msg;
                            if(tocken){
                                //localStorage.tocken = tocken;
                                //_this.$tocken = tocken;
                                localStorage.tocken = tocken;
                                _this.$tocken = tocken;
                            }
                            if(localStorage.currentPage){//需要在请求用户接口保存当页信息
                                alert(localStorage.currentPage);
                                $.ui.loadContent(localStorage.currentPage, false, false, "pop");
                            }else{
                                $.ui.loadContent('#user', false, false, "pop");
                            }
                        }
                    }else{
                        alert("请求失败");
                        _this.returnLoginPage();
                    }
                },'json');
            },
            submitLogin:function(){
                var username = $("#username").val();
                var password = $("#password").val();
                var _this = this;
                _this.$username = username;
                _this.$password = password;
                localStorage.username = username;
                localStorage.password = password;
                _this.login();
            },
            exitLogin:function(){
                this.$password = null;
                this.$tocken = null;
                localStorage.removeItem("tocken");
                localStorage.removeItem("password");
                $.ui.loadContent('#login', false, false, "pop");
            }
        }


        function userLoad(){
            if(!loginStorage.isInit){
                loginStorage.init();
                loginStorage.isInit = true;
            }
            var tocken = loginStorage.checkTocken();
            localStorage.currentPage = '#user';
        }
        window.userLoad = userLoad;//在我的账户页面加载时调用此函数
    });

})();