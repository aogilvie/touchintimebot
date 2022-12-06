import puppeteer from 'puppeteer';
import CONFIG from './config.json' assert { type: 'json' };

(async() => {
    function addHours(numOfHours, date = new Date()) {
        date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
        date.setMilliseconds(0);
        date.setSeconds(0);
        return date;
    }

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
 
    async function login() {
        await page.goto(CONFIG.URL, { waitUntil: 'networkidle2' });

        // login
        await page.$eval('input[type=text]', (el, CONFIG) => el.value = CONFIG.ID, CONFIG);
        await page.$eval('input[type=password]', (el, CONFIG) => el.value = CONFIG.PASS, CONFIG);
        await page.click('.btn-control-message');
        await page.waitForSelector('.record-clock-in');
        await delay(4000);
    }
 
    async function clockIn() {
        console.log('start time set to ', startTime);
        if ( CURRENT_TIME.getTime() === startTime.getTime()
            && startTime.getDay() !== 0 && startTime.getDay() !== 6 ) {
            await login();

            await page.click('.record-clock-in');
            console.log('** logged in at ', CURRENT_TIME);
            await delay(2000);
            await page.screenshot({path: '/app/screenshots/clockIn.png', fullPage: true});
        }
    }
 
    async function clockOut() {
        console.log('finish time set to ', finishTime);
        if ( CURRENT_TIME.getTime() === finishTime.getTime()
            && finishTime.getDay() !== 0 && finishTime.getDay() !== 6) {
            await login();

            await page.click('.record-clock-out');
            console.log('** logged out at ', CURRENT_TIME);
            await delay(2000);
            await page.screenshot({path: '/app/screenshots/clockOut.png', fullPage: true});
        }
    }

    const CURRENT_TIME = addHours(CONFIG.OFFSET_HOUR);
    let startTime = addHours(CONFIG.OFFSET_HOUR);
    startTime.setHours(
        CONFIG.START_TIME.HOUR,
        CONFIG.START_TIME.MINUTE,
        0,
        0
    );
    let finishTime = addHours(CONFIG.OFFSET_HOUR);
    finishTime.setHours(
        CONFIG.FINISH_TIME.HOUR,
        CONFIG.FINISH_TIME.MINUTE,
        0,
        0
    );
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-notifications'
        ],
        headless: true,
        executablePath: '/usr/bin/google-chrome'
    });

    const page = await browser.newPage();

    console.log('Running at ', CURRENT_TIME);
    await clockIn();
    await clockOut();

    browser.close();

})();
