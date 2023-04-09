type GetImageSourceFunc = (img: HTMLImageElement) => string

/**
 * Provides methods for getting Images from URLs and HTML elements.
 */
export class GetImages {
    #logConfig: LoggerConfigAddDuplicated = {}

    /**
    * Constructor of GetImages class.
    * @param loggerConfig - (Optional) The configuration for logging.
    */
    constructor(loggerConfig?: LoggerConfigAddDuplicated) {
        if (loggerConfig) this.#logConfig = loggerConfig
    }

    /**
     * Finds all the image elements in the provided HTML elements.
     * @param elements - The HTML elements to search for images in.
     * @returns An array of HTMLImageElement instances.
     */
    private findAllImages(elements: HTMLElement[]): HTMLImageElement[] {
        const images: HTMLImageElement[] = []

        // function getAllAttributes(element: HTMLElement): Record<string, string> {
        //     const attributes = element.attributes
        //     const result: Record<string, string> = {}

        //     for (let i = 0;i < attributes.length;i++) {
        //         const attribute = attributes.item(i)
        //         if (attribute) {
        //             result[attribute.name] = attribute.value
        //         }
        //     }

        //     return result
        // }

        elements.forEach(container => {
            images.push(...container.querySelectorAll("img"))
            // images.forEach(image => {
            //     const allAttributes = getAllAttributes(image)
            //     console.log(allAttributes)
            // })
        })

        return images
    }

    /**
     * Retrieves image descriptors or image source URLs from the specified HTML content.
     * @param content The HTML content to search for images.
     * @param fileName Optional. If provided, only returns the unique image source URLs. Otherwise, returns the image descriptors.
     * @returns An array of ImageDescriptor objects if fileName is not provided, otherwise returns a set of unique image source URLs.
     */
    async getImage(content: HTMLElement[], fileName?: undefined): Promise<ImageDescriptor[]>
    async getImage(content: HTMLElement[], fileName: string): Promise<Set<string>>
    async getImage(content: HTMLElement[], fileName?: string) {
        if (fileName === undefined) {
            const imgDescriptors = await this.getImageDescriptors(content)
            return imgDescriptors
        } else {
            const imgSrces = await this.getImageSrces(content)
            if (this.#logConfig.info) console.info(imgSrces)
            return imgSrces
        }
    }

    /**
     * Extracts image source URLs and their corresponding names (if available) from an array of HTML elements.
     * @param content - An array of HTML elements to search for images.
     * @returns An array of `ImageDescriptor` objects.
     * @throws An error if the `src` attribute value is not found.
     */
    private async getImageDescriptors(content: HTMLElement[]) {
        const imges = this.findAllImages(content)
        let logCounter = 0
        let namePlaceholderCounter = 1
        const imgDescriptors: ImageDescriptor[] = []

        imges.forEach((element) => {
            let name: string
            const lazyloading = element.getAttribute('loading')
            const getSrc = element.getAttribute('src')
            const getDataSrc = element.getAttribute('data-src')
            let hasSrc = getDataSrc || getSrc
            
            if (hasSrc === null) throw new Error(`Skipping: 'src' attribute value. Failed to find`)
            
            if (lazyloading && getDataSrc) {
                hasSrc = getDataSrc 
            }

            try {
                new URL(hasSrc)
            } catch (error) {
                if (this.#logConfig.error) console.error(`Invalid URL found: ${hasSrc}`)
                return
            }

            const attrData_Key = element.getAttribute('data-image-key')
            const attrData_Name = element.getAttribute('data-image-name')?.replace(" ", "_")
            const attrAlt = element.getAttribute('alt')?.replace(" ", "_")
            const checkThisAttr = attrData_Key ?? attrData_Name ?? attrAlt

            if (checkThisAttr === undefined) {
                if (this.#logConfig.info) console.info(`No possible filename found. New Name: Placeholder${namePlaceholderCounter}`)
                name = `Placeholder${namePlaceholderCounter++}`
            } else {
                name = checkThisAttr
            }        

            if (imgDescriptors.find(
                (value) => value.name === name)) {
                if (this.#logConfig.duplicate) logCounter++, console.warn(logCounter, `Skipping: "${name}". Already found`)
                return
            }

            imgDescriptors.push({ src: hasSrc, name })
            logCounter++
            if (this.#logConfig.log) console.log(logCounter, name)
        })

        return imgDescriptors
    }

    /**
     * Extracts unique image source URLs from an array of HTML elements.
     * @param content - An array of HTML elements to search for images.
     * @returns A `Set` of unique image source URLs.
     * @throws An error if the `src` attribute value is not found.
     */
    private async getImageSrces(content: HTMLElement[], getSrcFunc ?: GetImageSourceFunc) {
        const imges = this.findAllImages(content)
        let logCounter = 0
        const imgSet = new Set<string>()

        imges.forEach((element) => {
            const lazyloading = element.getAttribute('loading')
            const getSrc = element.getAttribute('src')
            const getDataSrc = element.getAttribute('data-src')
            let hasSrc = getDataSrc || getSrc
            
            if (hasSrc === null) throw new Error(`Skipping: 'src' attribute value. Failed to find`)

            if (lazyloading && getDataSrc) {
                hasSrc = getDataSrc 
            }

            try {
                new URL(hasSrc)
            } catch (error) {
                 if (this.#logConfig.error) console.error(`Invalid URL found: ${hasSrc}`)
                 return
            }

            if (imgSet.has(hasSrc)) {
                if (this.#logConfig.duplicate) logCounter++, console.warn(logCounter, `Skipping: 'src' attribute value. Already found`)
                return
            }

            imgSet.add(hasSrc)
            logCounter++
            if (this.#logConfig.log) console.log(logCounter, `${hasSrc}`)
        })

        return imgSet
    }
}