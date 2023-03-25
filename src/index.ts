import fetch from "node-fetch"
import { JSDOM } from "jsdom"
import jquery from "jquery"

/**
 * A utility class for working with web pages.
 */
export default class Site {

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
    
}

