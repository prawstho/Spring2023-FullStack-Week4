/*************************
 * File Name: logEvents.js
 * Purpose: To provide a logging feature
 * 
 * Created Date: 22 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 22 Jan 2022, PJR, File created
 * 25 Jan 2022, PJR, add date to log file name
 *      implement DEBUG global
 * 14 Oct 2022, PJR, moved into github project qap-two
 *      enhanced with additional folder creation for yyyy
 *
 *************************/

// NPM installed Modules
const { format, getYear } = require('date-fns');
const { v4: uuid } = require('uuid');

// Node.js common core global modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (event, level, message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
    if(DEBUG) console.log(logItem);
    try {
        // ensure logs/ folder also exists before adding the year folder
        let logsFolder = 'logs';
        if(DEBUG) console.log(logsFolder);
        if(!fs.existsSync(path.join(__dirname, logsFolder))) {
            await fsPromises.mkdir(path.join(__dirname, logsFolder));
        }
        // Include year when managing log folders
        let currFolder = 'logs/' + getYear(new Date());
        if(DEBUG) console.log(currFolder);
        if(!fs.existsSync(path.join(__dirname, currFolder))) {
            // include ./logs/yyyy
            await fsPromises.mkdir(path.join(__dirname, currFolder));
        }
        // Include todays date in filename
        const fileName = `${format(new Date(), 'yyyyMMdd')}` + '_http_events.log';
        await fsPromises.appendFile(path.join(__dirname, currFolder, fileName), logItem + '\n');
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;