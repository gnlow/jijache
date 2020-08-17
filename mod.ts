var provinces = [[6420000,"강원도","Gangwon"],
    [6410000,"경기도","Gyeonggi"],
    [6480000,"경상남도","Gyeongnam"],
    [6470000,"경상북도","Gyeongbuk"],
    [6290000,"광주","Gwangju"],
    [6270000,"대구","Daegu"],
    [6300000,"대전","Daejeon"],
    [6260000,"부산","Busan"],
    [6110000,"서울","Seoul"],
    [6310000,"울산","Ulsan"],
    [6280000,"인천","Incheon"],
    [6460000,"전라남도","Jeonnam"],
    [6450000,"전라북도","Jeonbuk"],
    [6500000,"제주도","Jeju"],
    [6440000,"충청남도","Chungnam"],
    [6430000,"충청북도","Chungbuk"],
    [5690000,"세종","Sejong"]]

provinces.forEach(async province => {
    const data = (await fetch(`https://www.gov.kr/portal/orgInfo/${province[0]}/locgov`).then(x => x.text()))
    province[3] = ((/\<select name\="searchOrgList" id\="searchOrgList" title\="소속기관 선택"\>(.*)\<\/select>/s.exec(data)?.[1]?.replace(/\s*\<option value\="(.*)(http.*?)"\>(.*)\<\/option\>/g, `$1, $2, $3_`))?.split("_")?.map(x=>x.split(", "))?.slice(0, -1) || [])
})

console.log(provinces)