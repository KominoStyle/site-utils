import fetch from "node-fetch"
import { JSDOM } from "jsdom"
import jquery from "jquery"

export class Site {

    static async getWindow(domainURL: string) {
        return new JSDOM(await (await fetch(domainURL)).text()).window
    }

    static async getDocument(domainURL: string) {
        return (await this.getWindow(domainURL)).document
    }

    static async get$(domainURL: string) {
        return jquery(await this.getWindow(domainURL)) as unknown as JQueryStatic
    }
    
}