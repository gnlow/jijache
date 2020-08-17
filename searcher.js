const puppeteer = require('puppeteer')
const urls = require("./urls.json");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()

    const search = async keyword => {
        await page.goto("https://google.com")
        await page.evaluate(keyword => {
            const input = document.querySelector("div > div > form > div > div > div > div > div > input")
            input.value = keyword
            const button = document.querySelector("center > input")
            button.click()
        }, keyword)
        await page.waitForNavigation()
    }
    const searchURL = async url => {
        await search(`site:${url} ai 로고 다운로드`)
        await page.evaluate(() => {
            document.querySelector(".r > a").click()
        })
        await page.waitForNavigation()
    }

    for await(url of urls.slice(2)) {
        console.log(`Search start: ${url}`)
        await searchURL(url)
        await page.evaluate(() => {
            function getElementByXpath(path) {
                return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
            }
            getElementByXpath("//*[contains(text(), '다운') and not(contains(text(), '뷰어'))]").click()
        })
        await page.waitFor(5000)
    }
    
})()