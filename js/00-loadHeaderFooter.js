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
            })
        }
    }
    //加载网页头和尾
    loadHeaderFooter.init();
})