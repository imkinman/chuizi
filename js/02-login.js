$(()=>{
    //验证功能
    let validate={
        $lis:$("#container>.user-box ul.user-info>li"),
        $uname:$("#container>.user-box li.user-name>input[type=text]"),
        $upwd:$("#container>.user-box li.password>input[type=password]"),
        $isAuto:$("#container>.user-box div.is-auto"),
        $login:$("#container>.user-box button.login"),
        $form:$("#container>.user-box>form"),
        regUname:/^(\w+@[0-9a-zA-Z_]+.[0-9a-zA-Z]+)|((\+86\s+|0086\s+)?1[34578]\d{9})$/,
        regUpwd:null,
        unameEmpty:"用户名不能为空",
        unameErr:"用户名格式不正确",
        upwdEmpty:"密码不能为空",
        upwdErr:"",
        unameBtn:false,
        upwdBtn:false,
        isAuto:false,
        storageName:null,
        storagePwd:null,
        init(){
            //用户名验证
            let me = this;
            this.$lis.on("focus","input",function(){
                $(this).parent("li").addClass("hover")
            })
            this.$uname.blur(function(){
                me.unameBtn=me.vali(
                    me.$uname,
                    me.regUname, 
                    me.unameEmpty, 
                    me.unameErr
                );
                me.canSubmit();
            });
            //密码验证
            this.$upwd.blur(function(){
                me.$uname.blur()
                me.upwdBtn=me.vali(
                    me.$upwd,
                    me.regUpwd, 
                    me.upwdEmpty, 
                    me.upwdErr
                );
                me.canSubmit();
            });
            //是否启用自动登录
            this.$isAuto.click(function(){
                me.$uname.blur();
                me.$upwd.blur();
                let aBtn=$(this).find("a.auto-login");
                if(!me.isAuto){
                    me.isAuto=true;
                    localStorage.setItem("isAuto","1");
                    me.canSubmit();
                    aBtn.addClass("active");
                }else{
                    me.isAuto=false;
                    localStorage.setItem("isAuto","0");
                    me.canSubmit();
                    aBtn.removeClass("active");
                }
            });
            //判断是否刚注册 和 是否自动登录
            if(!this.fromRegister()){
                this.autoLogin();
            }
            //登录按钮
            this.$login.click(function(e){
                e.preventDefault();
                me.login();
            })
        },
        fromRegister(){
            if( this.storageName = sessionStorage.getItem("uname") ){
                this.storagePwd = sessionStorage.getItem("upwd");
                this.$uname.val(this.storageName);
                this.$upwd.val(this.storagePwd);
                this.$uname.blur();
                this.$upwd.blur();
                this.$isAuto.click();
                return true;
            }
            return false;
        },
        autoLogin(){
            let isAuto=parseInt(localStorage.getItem("isAuto")),
                uname=localStorage.getItem("uname"),
                upwd=localStorage.getItem("upwd");
            if(isAuto && uname && upwd){
                this.$uname.val(uname);
                this.$upwd.val(upwd);
                this.$isAuto.click();
                if(confirm(`尊敬的用户：${uname} 您正在使用自动登录，是否需要自动登录`)){
                    this.login();
                }else{
                    this.$isAuto.click();
                }
            }
        },
        vali($ipt, reg, emptyTxt, errTxt){
            let value=$ipt.val()
            if(!value){//输入框为空时
                return this.err($ipt, emptyTxt);
            }
            if( reg ){
                if( reg.test(value)){
                    if($ipt.attr("type")==="text"){
                        return this.succ($ipt);
                    }
                }else{
                    return this.err($ipt ,errTxt);
                }
            }else{
                return this.succ($ipt);
            }
        },
        err($ipt, text){
            $ipt.next("span.info").addClass("show").html(text)
                .parent("li").addClass("err hover shake");
            setTimeout(()=>{$ipt.parent("li").removeClass("shake")},500)
            return false;
        },
        succ($ipt){
            $ipt.next("span.info").removeClass("show")
                .parent("li").removeClass("err hover shake");
            return true;
        },
        canSubmit(){
            if(this.unameBtn&&this.upwdBtn){
                this.$login.addClass("ok");
                return true;
            }else{
                this.$login.removeClass("ok");
                return false;
            }
        },
        login(){
            this.$uname.blur();
            this.$upwd.blur();
            if(this.canSubmit()){
                //请求数据
                $.ajax({
                    url:"../data/02-login.php",
                    data:this.$form.serialize(),
                    dataType:"json"
                }).then(data=>{
                    if(data.ok === 0){
                        //如果自动登录，保存用户信息
                        if(this.isAuto){
                            localStorage.setItem("uname",this.$uname.val());
                            localStorage.setItem("upwd",this.$upwd.val());
                        }
                        //清除注册时记录的数据
                        sessionStorage.clear();
                        //跳转回主页
                        location.href="../01-index.html";
                    }else{
                        this.err(eval(data.ipt), data.msg);
                    }
                }).catch(err=>{
                    alert("谢谢您发现了我网页里一个bug，请联系我，我会及时修改");
                })
            }
        }
    }

    //启动功能
    validate.init()
})