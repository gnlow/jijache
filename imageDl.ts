import {highSimple} from "./toData.ts"

for await (const dirEntry of Deno.readDir("./source")) {
    const source = JSON.parse(await Deno.readTextFile("./source/" + dirEntry.name))
    let high = ""
    source.locList.forEach(async ({DIST_NM, DIST_CODE}: any, i: number) => {
        let name = ""
        if(!i) {
            name = high = highSimple(DIST_NM)
        } else {
            name = `${high}_${DIST_NM.replace(/(.*)(시|군|구)/, "$1")}`
        }
        const res = await fetch(`https://www.laiis.go.kr/images/egovframework/img_logo_${DIST_CODE}.png`)
        const imageBytes = new Uint8Array(await res.arrayBuffer())
        await Deno.writeFile(`./logo/${name}.png`, imageBytes)
    })
}