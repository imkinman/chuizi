$(()=>{
    let loadHeaderFooter={
        $header:$("#header"),
        $footer:$("#footer"),
        init(){
            this.load(this.$header, "./page/00-header.html");
            this.load(this.$footer, "./page/00-footer.html");
        },
        load(elem, url){
            $.ajax({
                type:"get",
                url,
                dataType:"html"
            })
            .then(html=>{
                elem.html(html);
                return new Promise((resolve,reject)=>{
                    if(elem.attr("id")==="header"){
                        resolve();
                    }
                });
            })
            .then(()=>{
                /* 1、判断用户是否登录 */
                let isLogin={
                    $user_info:$("#user_info"),
                    init(){
                        $.ajax({
                            url:"./data/04-isLogin.php",
                            type:"get",
                            dataType:"json"
                        })
                        .then(data=>{
                            return new Promise((resolve,reject)=>{
                                if( data.ok===0 ){
                                    let html="";
                                    html+=`
                                        <a class="user-info-btn" href="./page/myorder.html?uid=${data['0']['uid']}"></a>
                                        <ul id="user_info_list" class="user-info-hidden">
                                            <li id="user_avatar">
                                                <img src="${data['0']['avatar']}">
                                            </li>
                                            <li class="user_opt">
                                                <a href="./page/myorder.html?uid=${data['0']['uid']}">
                                                    <b></b>
                                                    <span>我的订单</span>
                                                </a>
                                            </li>
                                            <li class="user_opt">
                                                <a href="./page/aftersale.html?uid=${data['0']['uid']}">
                                                    <b></b>
                                                    <span>售后服务</span>
                                                </a>
                                            </li>
                                            <li class="user_opt">
                                                <a href="./page/coupon.html?uid=${data['0']['uid']}">
                                                    <b></b>
                                                    <span>我的优惠</span>
                                                </a>
                                            </li>
                                            <li class="user_opt">
                                                <a href="./page/account.html?uid=${data['0']['uid']}">
                                                    <b></b>
                                                    <span>账户资料</span>
                                                </a>
                                            </li>
                                            <li class="user_opt">
                                                <a href="./page/address.html?uid=${data['0']['uid']}">
                                                    <b></b>
                                                    <span>收货地址</span>
                                                </a>
                                            </li>
                                            <li id="user_logout" class="user_opt">
                                                <a href="javascript:;">
                                                    <b></b>
                                                    <span>退出</span>
                                                </a>
                                            </li>
                                        </ul>
                                    `;
                                    this.$user_info.html(html);
                                    resolve(data.ok);
                                }
                            })
                        })
                        .then(()=>{
                            /* 3、用户信息list */
                            let user_info={
                                $user_info:$("#user_info"),
                                $user_info_list:$("#user_info_list"),
                                $logout:$("#user_logout>a"),
                                init(){
                                    let me=this;
                                    this.$user_info.mouseenter(function(){
                                        me.$user_info_list.removeClass("user-info-hidden").addClass("user-info-show");
                                    })
                                    this.$user_info.mouseleave(function(){
                                        me.$user_info_list.removeClass("user-info-show").addClass("user-info-hidden");
                                    })
                                    this.$logout.click(function(){
                                        $.ajax({
                                            url:"./data/05-logout.php",
                                            type:"get"
                                        })
                                        .then(()=>{
                                            location.reload();
                                        })
                                    })
                                }
                            }
                            //启动功能
                            user_info.init();
                        })
                        .catch(err=>{
                            alert("谢谢您发现了我网页里一个bug，请联系我，我会及时修改");
                        })
                    }
                }

                //启动功能
                isLogin.init();
            })
        }
    }
    
    
    //加载网页头和尾
    loadHeaderFooter.init();
})