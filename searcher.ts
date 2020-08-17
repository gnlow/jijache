const urls = JSON.parse(await Deno.readTextFile("urls.json"))

const search = async (url: string) => {
    const data = await fetch(`https://www.google.com/search?q=site:${url} ai 로고 다운로드`).then(res => res.text())
    return /<a href="\/url\?q=(.*?)">/s.exec(data)?.[1]
}

console.log(await search("http://www.gangneung.go.kr"))