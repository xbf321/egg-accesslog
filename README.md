# egg-accesslog

accesslog for egg。

某些情况，nginx 和 应用服务器，不在一台机器上，而有时恰恰需要在应用服务器上记录（如统计 PV，定位错误等）访问日志。

## Install

```bash
$ npm i egg-accesslog --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.accesslog = {
  enable: true,
  package: 'egg-accesslog',
};
```

> 如果使用 nginx 或其他反向代理服务器，请 **必须** 设置 **proxy = true**，不然获得的 ip 是本机ip，非远程机器的 ip.

    ```
    // {app_root}/config/config.default.js
    config.proxy = true
    ```

## Configuration

```js
// {app_root}/config/config.default.js
// 默认不需要配置，除非自定义 accesslog 格式
exports.accesslog = {
    /**
    * 自定义格式
    * {Object} data 数据对象
    *   - {String} ip 
    *   - {String} method
    *   - {String} url 
    *   - {String} host
    *   - {String} protocol 
    *   - {String} httpVersion
    *   - {String} statusCode
    *   - {String} contentLength 
    *   - {String} userAgent
    *   - {String} referer
    *   - {String} datetime
    *   - {String} responseTime
    *   - {String} xForwardedFor
    * @return {String} 返回格式
    **/
    format: function(data) {
        return `${data.ip}`;
    }
};
```
> accesslog 日志保存的路径，依据系统 *logger.dir* 的路径。

## Example

默认格式：

datetime ip "method url protocol/httpVersion" responseTime statusCode contentLength "referer" "userAgent" "host" "xForwardedFor"

```
2017-09-18 17:00:18,350 127.0.0.1 "GET /debug http/1.0" 12 200 5 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36" "127.0.0.1:7001" "192.168.1.1"
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
