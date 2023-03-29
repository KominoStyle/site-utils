import Site from "./site.js"
import { MeasureTime } from "./utils/Measure-Time.js"

export default Site


//#region TEST
async function start() {
    const domainURL = "https://escapefromtarkov.fandom.com/wiki/Zibbo_lighter"
    // const domainURL = "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/f/fd/Expeditionary-fuel-tank-icon.png/revision/latest?cb=20211220221611"
    const $ = await Site.get$(domainURL)
    const element = $("div").get()
    const document = await Site.getDocument(domainURL)
    const path = "../test/Download/"
    const fileName = "Christian"

    const content = $("#content")
    const content2 = document.getElementById("content")!
    
    // const downloader = await Site.downloadFile(domainURL, path, fileName)
    // Site.downloadImages(dom: ) -> Download.getImage(dom)

    const TestImage = await Site.downloadAllImages(content, path)
    // const test = TestImage.getImage(content)
    // console.log(TestImage)
    // const test2 = new GetImages({log: true})
    // const test3 = await test2.getImage(content)
    // console.log(test3)


    console.log('END TEST')
}

// Async IIFE or short "AIIFE" -  Async Immediately Invoked Function Expression
(async function () {
    const timer = new MeasureTime()
    const time1 = await timer.measureAsync(start)
    console.log(`${time1}`)
})()
//#endregion
