'use strict';
const path = require('path');
module.exports = (appInfo, option) => {
    let dir = `${appInfo.root}/logs/${appInfo.name}`;
    if (option.logger && option.logger.dir) {
        dir = option.logger.dir;
    }
    return {
        customLogger: {
            accessLogger: {
                file: path.join(dir, 'access.log'),
            },
        },
    };
};
