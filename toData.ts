const highSimple = (name: string) => name.replace(/(.*)(도|광역시|특별자치시|특별자치도)/, "$1").replace(/.(.)./, "$1")

const locals = []
for await (const dirEntry of Deno.readDir("./source")) {
    const source = JSON.parse(await Deno.readTextFile("./source/" + dirEntry.name))
    const [high, ...lows] = source.locList
    locals.push({
        id: highSimple(high.DIST_NM),
        name: highSimple(high.DIST_NM),
        division: "high",
        type: high.DIST_NM.replace(/(.*)(도|광역시|특별자치시|특별자치도)/, "$2"),
        homepageURL: high.HP_URL,
        assemblyURL: high.ASMBLY_URL,
    })
    locals.push(...lows.map((low: any) => ({
        id: `${highSimple(high.DIST_NM)}_${low.DIST_NM.replace(/(.*)(시|군|구)/, "$1")}`,
        name: low.DIST_NM.replace(/(.*)(시|군|구)/, "$1"),
        type: low.DIST_NM.replace(/(.*)(시|군|구)/, "$2"),
        division: "low",
        in: highSimple(high.DIST_NM),
        homepageURL: low.HP_URL,
        assemblyURL: low.ASMBLY_URL,
    })))
}
const mappedLocals = {} as any
locals.forEach(local => {
    mappedLocals[local.id] = local
})

console.log(JSON.stringify(mappedLocals))