import { GetImages } from "../utils/getImages"

describe('GetImages', () => {
    let getImages: GetImages = new GetImages()

    describe('findAllImages', () => {
        it("findAllImages should return an array of HTMLImageElements", () => {
            const container = document.createElement("div")
            const img1 = document.createElement("img")
            const img2 = document.createElement("img")
            container.appendChild(img1)
            container.appendChild(img2)

            const result = getImages["findAllImages"]([container])
            expect(result).toHaveLength(2)
            expect(result[0]).toBeInstanceOf(HTMLImageElement)
            expect(result[1]).toBeInstanceOf(HTMLImageElement)
        })
    })

    describe('getImage', () => {
        it("should return an array of ImageDescriptors when fileName is undefined", async () => {
            const container = document.createElement("div")
            const img1 = document.createElement("img")
            img1.src = "https://example.com/image1.jpg"
            const img2 = document.createElement("img")
            img2.src = "https://example.com/image2.jpg"
            container.appendChild(img1)
            container.appendChild(img2)

            const result = await getImages.getImage([container])
            expect(result).toHaveLength(2)
            expect(result[0]).toEqual({ src: "https://example.com/image1.jpg", name: "Placeholder1" })
            expect(result[1]).toEqual({ src: "https://example.com/image2.jpg", name: "Placeholder2" })
        })

        it("should return a Set of unique image source URLs when fileName is provided", async () => {
            const container = document.createElement("div")
            const img1 = document.createElement("img")
            img1.src = "https://example.com/image1.jpg"
            const img2 = document.createElement("img")
            img2.src = "https://example.com/image2.jpg"
            container.appendChild(img1)
            container.appendChild(img2)

            const result = await getImages.getImage([container], "fileName")
            expect(result).toBeInstanceOf(Set)
            expect(result.size).toBe(2)
            expect(result.has("https://example.com/image1.jpg")).toBeTruthy()
            expect(result.has("https://example.com/image2.jpg")).toBeTruthy()
        })

        it("should throw an error if 'src' attribute value is not found", async () => {
            const container = document.createElement("div")
            const img1 = document.createElement("img")
            container.appendChild(img1)

            await expect(getImages.getImage([container], undefined)).rejects.toThrow(
                "Skipping: 'src' attribute value. Failed to find"
            )
        })

        it("should not return invalid URLs", async () => {
            const container = document.createElement("div")
            const img1 = document.createElement("img")
            img1.src = "invalidurl"
            const img2 = document.createElement("img")
            img2.src = "https://example.com/image2.jpg"
            container.appendChild(img1)
            container.appendChild(img2)

            const result = await getImages.getImage([container], "fileName")
            expect(result).toBeInstanceOf(Set)
            expect(result.size).toBe(1)
            expect(result.has("https://example.com/image2.jpg")).toBeTruthy()
        })
    })

    describe('getImageDescriptors', () => {
        it('should return an array of ImageDescriptor objects', async () => {
            // Create HTML element for testing
            const element = document.createElement('div')
            element.innerHTML = `
        <img src="https://example.com/image1.jpg" alt="Image 1" />
        <img src="https://example.com/image2.jpg" alt="Image 2" />
      `

            const result = await getImages['getImageDescriptors']([element])

            expect(result).toHaveLength(2)
            expect(result).toEqual([
                { src: 'https://example.com/image1.jpg', name: 'Image_1' },
                { src: 'https://example.com/image2.jpg', name: 'Image_2' }
            ])
        })

        it("should return an array of ImageDescriptors with placeholders", async () => {
            const container = document.createElement("div")
            const img1 = document.createElement("img")
            img1.src = "https://example.com/image1.jpg"
            const img2 = document.createElement("img")
            img2.src = "https://example.com/image2.jpg"
            container.appendChild(img1)
            container.appendChild(img2)

            const result = await getImages['getImageDescriptors']([container])
            expect(result).toHaveLength(2)
            expect(result[0]).toEqual({ src: "https://example.com/image1.jpg", name: "Placeholder1" })
            expect(result[1]).toEqual({ src: "https://example.com/image2.jpg", name: "Placeholder2" })
        })

        it('should throw an error if src attribute value is not found', async () => {
            // Create HTML element with missing src attribute for testing
            const element = document.createElement('div')
            element.innerHTML = '<img alt="Image without src" />'

            await expect(getImages['getImageDescriptors']([element])).rejects.toThrowError("Skipping: 'src' attribute value. Failed to find")
        })
    })

    describe('getImageSrces', () => {
        it('should return a Set of unique image source URLs', async () => {
            // Create HTML element for testing
            const element = document.createElement('div')
            element.innerHTML = `
        <img src="https://example.com/image1.jpg" />
        <img src="https://example.com/image2.jpg" />
        <img src="https://example.com/image1.jpg" />
      `


            const result = await getImages['getImageSrces']([element])

            expect(result).toEqual(new Set([
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg'
            ]))
        })

        it('should throw an error if src attribute value is not found', async () => {
            // Create HTML element with missing src attribute for testing
            const element = document.createElement('div')
            element.innerHTML = '<img alt="Image without src" />'

            await expect(getImages['getImageSrces']([element])).rejects.toThrowError("Skipping: 'src' attribute value. Failed to find")
        })
    })
})