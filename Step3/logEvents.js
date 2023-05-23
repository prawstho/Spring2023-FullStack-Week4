/*************************
 * File Name: logEvents.js
 * Purpose: To provide a logging feature
 * 
 * Created Date: 23 May 2023
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 23 May 2023, PJR, File created
 *
 *************************/

// NPM installed Modules
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (event, level, message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
    console.log(logItem);
}

module.exports = logEvents;