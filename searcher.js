const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const search = async keyword => {
        await page.goto('https://google.com')
        await page.evaluate(keyword => {
            const input = document.querySelector("div > div > form > div > div > div > div > div > input")
            input.value = keyword
            const button = document.querySelector("center > input")
            button.click()
        }, keyword)
        await page.waitForNavigation()
    }

    await search("Hello")

    await page.screenshot({path: 'example.png'})

    await browser.close()
})()