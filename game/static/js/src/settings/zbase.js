class Settings {
    constructor(root) {
        this.playground_root = root;
        this.platform = "WEB";
        if (this.playground_root.AcWingOs) this.platform = "ACAPP";

        this.photo = new Image();
        this.photo.src = "";

        this.start();
    }

    start() {
        this.get_info();
    }

    register() {

    }

    login() {

    }

    get_info() {
        let outer = this;
        // fetch('https://app786.acapp.acwing.com.cn/settings/get_info/', {
        //     method: 'POST',
        //     body: {
        //         platform: outer.platform
        //     },
        //     // 使用 fetch api 会出现 403 forbid
        //     credentials: "same-origin",
        //     headers: {
        //         "X-CSRFToken": getCookie("csrftoken"),
        //         "Accept": "application/json",
        //         'Content-Type': 'application/json'
        //     },
        // }).then((response) => {
        //     console.log(response.json());
        // });

        // // 通过 header 中添加 csrf 验证解决
        // function getCookie(name) {
        //     var cookieValue = null;
        //     if (document.cookie && document.cookie !== '') {
        //         var cookies = document.cookie.split(';');
        //         for (var i = 0; i < cookies.length; i++) {
        //             var cookie = jQuery.trim(cookies[i]);
        //             // Does this cookie string begin with the name we want?
        //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // }

        // 使用 XMLHttp 请求库实现
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://app786.acapp.acwing.com.cn/settings/get_info/?platform=WEB", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            //判断readyState就绪状态是否为4，判断status响应状态码是否为200
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //获取服务器的响应结果
                let responseText = xmlhttp.responseText;
                alert(responseText);
                let finalJson = JSON.stringify(responseText)
                console.log(finalJson)
            }
        }
    }

    hide() {

    }

    show() {

    }
}