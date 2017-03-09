module.exports = {
	prot:18080,
	appid : "你的appid   ",
	secret : "你的AppSecret  ",
	menus : {
	    "button": [
	        {
	            "name": "点我扫码", 
	            "sub_button": [
	                {
	                    "type": "scancode_waitmsg", 
	                    "name": "扫码带提示", 
	                    "key": "rselfmenu_0_0", 
	                    "sub_button": [ ]
	                }, 
	                {
	                    "type": "scancode_push", 
	                    "name": "扫码推事件", 
	                    "key": "rselfmenu_0_1", 
	                    "sub_button": [ ]
	                }
	            ]
	        },
	        {
	            "name": "666", 
	            "sub_button": [
	                {
	                    "type": "view", 
	                    "name": "去百度", 
	                    "url":"http://www.baidu.com"
	                }, 
	                {
	                    "type": "view", 
	                    "name": "去腾讯", 
	                    "url":"http://www.qq.com"
	                }
	            ]
	        },
	        {
	            "name": "爱爱爱", 
	            "sub_button": [
	                {
	                    "type": "view", 
	                    "name": "展示一下", 
	                    "url":"http://www.baidu.com"
	                }, 
	                {
	                    "type": "view", 
	                    "name": "node魅力", 
	                    "url":"http://www.qq.com"
	                }
	            ]
	        }
	    ]
	}
}
