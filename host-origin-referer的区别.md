host 请求的资源的host，仅仅包括域名和端口号

origin 发出请求的地方，仅仅包括协议和域名，只出现在cors中，会有accept-control-allow-origin返回

referer 发出请求的地方的完整路径

代理原理
当从localhost:3000发出请求，changeoriign为true时，获取链接的地址变成target，但是origin和referer仍是localhost
