const puppeteer = require('puppeteer');

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
        
        console.log(page.url())
    }

    await searchURL("http://www.gangneung.go.kr")

    await page.screenshot({path: "example.png"})

    await browser.close()
})()