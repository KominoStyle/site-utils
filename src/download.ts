import { createWriteStream } from "fs"
import fetch, { Response } from "node-fetch"
import fs from "fs/promises"
import { dirname } from "path"
import { GetImages } from "./utils/getImages.js"

/**
 * Provides methods for downloading files from URLs and HTML elements.
 */
export class Download {
    #logConfig: LoggerConfig = {}

    /**
     * Creates a new instance of the Download class.
     * @param loggerConfig - (Optional) Configuration options for the Logger.
     */
    constructor(loggerConfig?: LoggerConfig) {
        if (loggerConfig) this.#logConfig = loggerConfig
    }

    /**
     * Creates a folder at the given path if it does not exist.
     * @param path - The path of the folder to create.
     * @returns A Promise that resolves once the folder is created.
     */
    private async createFolder(path: string) {
        return await fs.mkdir(path, { recursive: true })
    }

    /**
     * Downloads a file from the given URL and saves it to the given path.
     * @param url - The URL of the file to download.
     * @param path - The path to save the downloaded file.
     * @param fileName - The name to use for the downloaded file.
     * @param index - (Optional) The index of the file to download (if downloading multiple files with the same name).
     * @returns A Promise that resolves once the file is downloaded.
     * @throws An error if the request fails or the response status is not OK.
     */
    async fileFromUrl(url: string, path: string, fileName: string, index?: number) {

        let response: Response

        try {
            response = await fetch(url)
        } catch (error) {
            throw new Error("Request failed.")
        }
        if (!response.ok) {
            throw new Error(`Failed to download file, status code: ${response.status}`)
        }

        // Determine the file extension based on the Content-Type header
        const contentType = response.headers.get("Content-Type")
        if (contentType === null) throw new Error("No Content Type")
        const endIndex = contentType.indexOf(" ")
        const fileExtension = contentType.slice(contentType.indexOf("/") + 1, endIndex === -1 ? undefined : endIndex - 1)

        // Ensure the directory exists before writing the file
        await this.createFolder((dirname(path + fileName)))

        // Write the file to disk
        const fileStream = createWriteStream(`${path}${fileName}${index === undefined ? "" : index}.${fileExtension}`)

        if (response.body) {
            response.body.pipe(fileStream)
        } else {
            throw new Error(`Failed to get response body for file: ${url}`)
        }

        // Log success message
        if (this.#logConfig.log) console.log(`File downloaded successfully to ${path}`)
    }

  /**
   * Downloads all images from the given HTML elements and saves them to the given path.
   * @param elements - The HTML elements from which to download images.
   * @param path - The path to save the downloaded images.
   * @param fileName - (Optional) The name to use for the downloaded images.
   */
    async getAllImages(elements: HTMLElement[], path: string, fileName?: string) {
        const imageGetter = new GetImages({ log: true , duplicate: true})
        if (fileName === undefined) {
            const descriptors = await imageGetter.getImage(elements, fileName)
            await this.fileFromdescriptor(descriptors, path)
        } else {
            const srces = await imageGetter.getImage(elements, fileName)
            await this.fileFromSet(srces, path, fileName)
        }
    }


    /**
     * Downloads files from a set of URLs and saves them to the given path.
     * @param set - The set of URLs to download.
     * @param path - The path to save the downloaded files.
     * @param fileName - The name to use for the downloaded files.
     */
    private async fileFromSet(set: Set<string>, path: string, fileName: string) {
        let i = 1
        for (const url of set) {
            this.fileFromUrl(url, path, fileName, i++)
        }
    }

    /**
     * Downloads files from a set of ImageDescriptors and saves them to the given path.
     * @param set - The set of ImageDescriptors to download.
     * @param path - The path to save the downloaded files.
     */
    private async fileFromdescriptor(set: ImageDescriptor[], path: string) {
        for (const description of set) {
            this.fileFromUrl(description.src, path, description.name)
        }
    }

}