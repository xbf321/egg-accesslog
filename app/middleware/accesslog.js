'use strict';

const utility = require('utility');
const util = require('util');

module.exports = (options, app) => {
    return function* accesslogMiddleware(next) {
        yield next;
        const data = {
            ip: this.request.header['x-forwarded-for'] || this.ip,
            method: this.request.method,
            url: this.request.url,
            host: this.request.header.host || '-',
            protocol: this.request.protocol,
            statusCode: this.response.status || '-',
            contentLength: this.response.header['content-length'] || '-',
            userAgent: this.request.header['user-agent'] || '-',
            referer: this.request.header.referer || '-',
            datetime: utility.logDate(','),
        };

        let content = '';
        if (typeof options.format === 'function') {
            // 自定义格式
            content = options.format(data);
        } else {
            content = util.format('%s %s "%s %s %s" %s %s "%s" "%s" "%s"',
                data.datetime,
                data.ip,
                data.method,
                data.url,
                data.protocol,
                data.statusCode,
                data.contentLength,
                data.referer,
                data.userAgent,
                data.host);
        }
        app.getLogger('accessLogger').write(content);
    };
};
