'use strict';

const utility = require('utility');
const util = require('util');

module.exports = (options, app) => {
    return function* accesslogMiddleware(next) {
        const startTime = Date.now();
        yield next;
        const data = {
            xForwardedFor: this.request.header[app.config.ipHeaders] || '',

            // 参照：https://eggjs.org/api/app_extend_request.js.html
            ip: this.request.ip || '', 
            method: this.method,
            url: this.url,
            host: this.host || '-',
            protocol: this.protocol,
            httpVersion: `${this.req.httpVersionMajor}.${this.req.httpVersionMinor}`,
            statusCode: this.response.status || '-',
            contentLength: this.length || '-',
            userAgent: this.request.header['user-agent'] || '-',
            referer: this.request.header.referer || '-',
            datetime: utility.logDate(','),
            responseTime: Date.now() - startTime
        };
        let content = '';
        if (typeof options.format === 'function') {
            // 自定义格式
            content = options.format(data);
        } else {
            content = util.format('%s %s "%s %s %s/%s" %s %s %s "%s" "%s" "%s" "%s"',
                data.datetime,
                data.ip,
                data.method,
                data.url,
                data.protocol,
                data.httpVersion,
                data.responseTime,
                data.statusCode,
                data.contentLength,
                data.referer,
                data.userAgent,
                data.host,
                data.xForwardedFor);
        }
        app.getLogger('accessLogger').write(content);
    };
};
