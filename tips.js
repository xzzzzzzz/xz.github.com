(function(window,document){
	var showTips = function(showTipsDom,options){
		// 判断是用函数创建的还是用new创建的。这样我们就可以通过showTigs("dom") 或 new showTigs("dom")来使用这个插件了  
        if(!(this instanceof showTips))return new showTips(showTipsDom,options); 
		this.options = this.extend({
		      "content" : "111"
		    },options)

		// 判断传进来的是DOM还是字符串  
        if((typeof showTipsDom)==="string"){  
            this.showTipsDom = document.querySelector(showTipsDom);  
        }else{  
            this.showTipsDom = showTipsDom;  
        }
        var boxDom = document.createElement("div");  
        var boxDomContent = document.createElement("div")

        // 设置默认样式 注意将z-index值设置大一些，防止其他元素层级比遮罩层高  
        boxDom.style.cssText = "display: none;position: absolute;left: 0;top: 0;width: 100%;height:100%;background-color: rgba(0,0,0,0.8);z-index:9999;"; 
		boxDomContent.style.cssText = "position:absolute;width:30%;height:30%;background:#fff;font-size:18px;color:red;left:30px;top:30px;"

		// 追加或重设其样式  
        if(this.options.boxDomStyle){  
            this.setStyle(boxDom,this.options.boxDomStyle);  
        }  
        if(this.options.imgDomStyle){  
            this.setStyle(boxDomContent,this.options.boxDomContentStyle);  
        }

         boxDomContent.innerHTML = this.options.content;
        boxDom.appendChild(boxDomContent);  
        this.boxDom = boxDom;

		this.init()
	}
	showTips.prototype = {
		 init:function(){  
            this.event();  
        },  
        extend:function(obj,obj2){  
            for(var k in obj2){  
                obj[k] = obj2[k];  
            }  
            return obj;  
        },  
        setStyle:function(dom,objStyle){  
            for(var k in objStyle){  
                dom.style[k] = objStyle[k];  
            }  
        },  
        event:function(){  
            var _this = this;  
  
            this.showTipsDom.addEventListener("click",function(){  
                document.body.appendChild(_this.boxDom);  
                _this.boxDom.style.display = "block";  
                                // 打开遮罩层的回调  
                _this.options.open&&_this.options.open();  
            },false);  
  
            this.boxDom.addEventListener("click",function(){  
                this.style.display = "none";  
                                // 关闭遮罩层的回调  
                _this.options.close&&_this.options.close();  
            },false);  
        }
	}
	window.showTips = showTips;
}(window,document))