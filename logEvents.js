// NPM installed Modules
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (event, level, message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
    console.log(logItem);
}

module.exports = logEvents;