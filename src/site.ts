import fetch from "node-fetch"
import { JSDOM } from "jsdom"
import jquery from "jquery"
import { Download } from "./download.js"
import { isHTMLElement } from "./utils/checkFunctions.js"

export default class Site {
    private static downloader = new Download()

    //#region Site
    /**
     * Gets the window object of a given domain URL.
     * @param domainURL - The URL of the domain to get the window object for.
     * @returns The window object of the given domain URL.
     */
    static async getWindow(domainURL: string) {
        return new JSDOM(await (await fetch(domainURL)).text()).window
    }

    /**
     * Gets the document object of a given domain URL.
     * @param domainURL - The URL of the domain to get the document object for.
     * @returns The document object of the given domain URL.
     */
    static async getDocument(domainURL: string) {
        return (await this.getWindow(domainURL)).document
    }

    /**
     * Gets the jQuery object of a given domain URL.
     * @param domainURL - The URL of the domain to get the jQuery object for.
     * @returns The jQuery object of the given domain URL.
     */
    static async get$(domainURL: string) {
        return jquery(await this.getWindow(domainURL)) as unknown as JQueryStatic
    }

    //#region Private Zone

    /**
     * Gets the jQuery object of a given HTML content.
     * @param HTML - The HTML content to get the jQuery object for.
     * @returns The jQuery object of the given HTML content.
     */
    private static async get$HTML(HTMLElement: string) {
        const window = new JSDOM(HTMLElement).window
        return jquery(window) as unknown as JQueryStatic
    }
    /**
     * Gets the jQuery object of a given HTML content.
     * @param HTML - The HTML content to get the jQuery object for.
     * @returns The jQuery object of the given HTML content.
     */
    private static getHTML(HTMLElement: string) {
        return new JSDOM(HTMLElement).window
    }

    /**
     * Gets the jQuery object for a given HTML element.
     * @param content - The HTML element or jQuery object to get the jQuery object from.
     * @returns A Promise that resolves to the jQuery object for the given element.
     * @throws An error if no usable content element is provided.
     */
    private static makeHTMLElementArray(content: UseHTMLElement) {
        if (content === null) {
            throw new Error("No usable content Element")
        }

        return isHTMLElement(content) ? [content] : content instanceof Array ? content : content.get()
    }
    //#endregion
    //#endregion

    //#region Download function

    /**
     * Downloads a file from a given URL.
     * @param url - The URL of the file to download.
     * @param path - The directory path where the downloaded file should be saved.
     * @param fileName - (Optional) The name to use for the downloaded file.
     * @returns A Promise that resolves to the downloaded file.
     */
    static async downloadFile(url: string, path: string, fileName: string) {
        return await this.downloader.fileFromUrl(url, path, fileName)
    }

    /**
     * Downloads all images from a given HTML content.
     * @param content - The HTML element from which to download images.
     * @param path - The directory path where the downloaded images should be saved.
     * @param fileName - (Optional) The name to use for the downloaded images.
     * @returns A Promise that resolves to the downloaded images.
     */
    static async downloadAllImages(content: UseHTMLElement, path: string, fileName?: string) {
        const elements = this.makeHTMLElementArray(content)

        return await this.downloader.getAllImages(elements, path, fileName)
    }
    //#endregion

}