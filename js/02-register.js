$(()=>{
    //验证功能
    let validate={
        $lis:$("#container>.user-box ul.user-info>li"),
        $uname:$("#container>.user-box li.user-name>input[type=text]"),
        $upwd:$("#container>.user-box li.password>input[type=password]"),
        $re_upwd:$("#container>.user-box li.repeat-password>input[type=password]"),
        $isOk:$("#container>.user-box div.is-ok"),
        $submit:$("#container>.user-box button.submit"),
        $form:$("#container>.user-box>form"),
        $wait:$("#wait"),
        regUname:/^(\w+@[0-9a-zA-Z_]+.[0-9a-zA-Z]+)|((\+86\s+|0086\s+)?1[34578]\d{9})$/,
        regUpwd:/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)[a-zA-Z0-9~!@#$%^&*_]{6,16}$/,
        unameEmpty:"用户名不能为空",
        unameErr:"用户名格式不正确",
        upwdEmpty:"密码不能为空",
        upwdErr:"密码格式不正确",
        upwd:"",
        unameBtn:false,
        upwdBtn:false,
        reUpwdBtn:false,
        isOkBtn:false,
        init(){
            let me = this;
            this.$lis.on("focus","input",function(){
                $(this).parent("li").addClass("hover")
            })
            //用户名验证
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
                me.upwdBtn=me.vali(
                    me.$upwd,
                    me.regUpwd, 
                    me.upwdEmpty, 
                    me.upwdErr
                );
                me.canSubmit();
            });
            //重复密码验证
            this.$re_upwd.blur(function(){
                let value=$(this).val();
                if((!value)||value!==me.upwd){
                    $(this).next("span.info").addClass("show")
                        .parent("li").addClass("err shake");
                    setTimeout(()=>{$(this).removeClass("shake")},500)
                    me.reUpwdBtn=false;
                    me.canSubmit();
                }else{
                    $(this).next("span.info").removeClass("show")
                        .parent("li").removeClass("err hover shake");
                    me.reUpwdBtn=true;
                    me.canSubmit();
                }
            })
            //是否同意声明
            this.$isOk.click(function(){
                let aBtn=$(this).find("a.check");
                if(!me.isOkBtn){
                    me.isOkBtn=true;
                    aBtn.addClass("active");
                    me.canSubmit();
                }else{
                    me.isOkBtn=false;
                    me.canSubmit();
                    aBtn.removeClass("active");
                }
            });
            //注册按钮
            this.$submit.click(function(e){
                e.preventDefault();
                me.register();
            })
        },
        vali($ipt, reg, emptyTxt, errTxt){
            let value=$ipt.val()
            if(!value){//输入框为空时
                return this.err($ipt, emptyTxt);
            }
            if(reg.test(value)){
                if($ipt.attr("type")==="text"){
                    $.ajax({
                        url:"../data/03-isCunzai.php",
                        type:"get",
                        data:"uname="+$ipt.val(),
                        dataType:"json",
                    }).then(data=>{
                        if(!data.ok){
                            this.unameBtn=this.err($ipt ,data.msg);
                            this.canSubmit();
                        }else{
                            console.log(1)
                            this.unameBtn=this.succ($ipt);
                            this.canSubmit();
                        }
                    }).catch(err=>{
                        alert("谢谢您发现了我网页里一个bug，请联系我，我会及时修改");
                    })
                }
                if($ipt.attr("data-pwd")==="upwd"){
                    this.upwd=value;
                    return this.succ($ipt);
                }
            }else{
                return this.err($ipt ,errTxt);
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
                .parent("li").removeClass("err hover");
            return true;
        },
        canSubmit(){
            if(this.unameBtn&&this.upwdBtn&&this.reUpwdBtn&&this.isOkBtn){
                this.$submit.addClass("ok");
                return true;
            }else{
                this.$submit.removeClass("ok");
                return false;
            }
        },
        register(){
            this.$upwd.blur();
            this.$re_upwd.blur();
            this.$isOk.blur();
            if(this.canSubmit()){
                $.ajax({
                    url:"../data/02-register.php",
                    data:this.$form.serialize(),
                    dataType:"json"
                }).then(data=>{
                    if(data.ok === 0){
                        sessionStorage.setItem("uname",this.$uname.val());
                        sessionStorage.setItem("upwd",this.$upwd.val());
                        this.$wait.removeClass("hidden").addClass("show");
                        setTimeout(()=>{
                            location.href="../page/02-login.html";
                        },1000);
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