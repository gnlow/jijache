const res = await fetch("https://www.laiis.go.kr/images/egovframework/img_logo_4219000000.png")
const imageBytes = new Uint8Array(await res.arrayBuffer())
await Deno.writeFile("img.png", imageBytes)