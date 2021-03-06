/* 广告轮播方法1
$(()=>{
    //广告轮播
    (()=>{
        let $imgs=$("#banner ul"),      
            $img=$imgs.find("li"),  
            imgLen=$img.length,
            totalW=parseInt($imgs.width()),
            width=parseInt($imgs.find("li").width()),
            onceTime=3000,
            n=0;
            function moveOnce(){
                n++;
                imgs.animate({left:-width*n+"px"},1000,()=>{
                    if(n==$imgLen-1){
                        $imgs.css("left",0);
                        n=0;
                    }
                })
            }
            let timer=setInterval(moveOnce,onceTime);
    })();
})*/
$(()=>{
    
    /* 1、广告轮播 */
    let lunbo={
        $imgs:$("#banner ul"),
        $img:$("#banner ul li"),
        n:0,
        timer1:null,
        TRANS:3000,
        moveTime:1000,
        state:1,
        className:["first","second_left","third_left","third_right","second_right","first"],  
        init(){
            this.move();
        },
        move(){
            let me=this;
            this.timer1=setInterval(this.leftOnce.bind(this),this.TRANS);
            this.$imgs.on("click","li",function(){
                if(me.state==1){
                    clearInterval(me.timer1);
                    let liClass =  $(this).attr("class");
                    switch(liClass){
                        case me.className[1]:
                            me.rightOnce();
                            break;
                        case me.className[2]:
                            me.n--
                            me.rightOnce();
                            break;
                        case me.className[3]:
                            me.n++;
                            me.leftOnce();
                            break;
                        case me.className[4]:
                            me.leftOnce();
                            break;
                    }
                    me.timer1=setInterval(me.leftOnce.bind(me),me.TRANS);
                }
            })
        },
        leftOnce(){
            this.state=0;
            if(this.n==5){
                this.n=0;
            }
            this.n++;
            for(let i=0;i<this.$img.length;i++){
                $("[data-i="+i+"]").attr("class",this.className[(i+this.n)%5]);
            }
            setTimeout(()=>{this.state=1},this.moveTime);
        },
        rightOnce(){
            this.state=0;
            if(this.n==0){
                this.n=5;
            }
            for(let i=0;i<this.$img.length;i++){
                $("[data-i="+i+"]").attr("class",this.className[(this.n+i-1)%5])
            }
            this.n--;
            setTimeout(()=>{this.state=1},this.moveTime);
        }
    }

    /* 2、固定导航 */
    let fix_nav={
        $fix_nav:$("#fix-nav"),
        init(){
            let me=this;
            $(document).scroll(function(e){
                if($(this).scrollTop()<150){
                    me.$fix_nav.removeClass("fix-nav-show").addClass("fix-nav-hidden");
                }else{
                    me.$fix_nav.removeClass("fix-nav-hidden").addClass("fix-nav-show");
                }
            })
        }
    }

    /* 3、热门商品 */
    let hot_product={
        hot_btn:$("#hot-product .hot-btn"),
        hot_lis:$("#hot-product>ul.hot-product-list"),
        init(){
            //按钮功能
            this.hot_btn.on("click","a",function(){
                console.log("保留功能");
            })
            //鼠标移入li
            this.hot_lis.on("mouseenter","li",function(){
                $(this)
                    .find("span.price")
                    .css("display","none")
                    .next("a.price-hover")
                    .css("display","block")
            }).on("mouseleave","li",function(){
                $(this)
                    .find("span.price")
                    .css("display","block")
                    .next("a.price-hover")
                    .css("display","none")
            })
        }
    }

    //启动功能
    lunbo.init();
    fix_nav.init();
    hot_product.init();
})