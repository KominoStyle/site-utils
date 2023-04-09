/* 
import { createWriteStream, ReadStream } from "fs"
import axios from "axios"
import fs from "fs/promises"
import { dirname } from "path"
import { GetImages } from "../utils/getImages.js"
import { isString } from "../utils/checkFunctions.js"
// import { Download } from "../download.js" // Import the Download class to be tested
import { Download } from "../download"

describe("Download", () => {
    const download = new Download()



    
    it("should create a folder if it does not exist", async () => {
        // Arrange
        const folderPath = "./test-folder"
        
        // Act
        await download["createFolder"](folderPath)
        
        // Assert
        // You may need to implement a file system check to verify that the folder was created
        // For example, you could use fs.stat or fs.access to check if the folder exists
        // and throw an error if it does not
    })
    
    it("should download a file from a URL and save it to a given path", async () => {
        // Arrange
        const url = "https://media.tenor.com/PiU2nB6P3f0AAAAC/kanao-demon-slayer.gif"
        const path = "./downloads/"
        const fileName = "image"

        // Act
        await download.fileFromUrl(url, path, fileName)

        // Assert
        // You may need to implement a file system check to verify that the file was downloaded
        // For example, you could use fs.stat or fs.access to check if the file exists
        // and throw an error if it does not
    })
    
    it("should throw an error if the URL request fails", async () => {
        // Arrange
        const url = "https://example.com/nonexistent.jpg"
        const path = "./downloads/"
        const fileName = "nonexistent.jpg"
        
        // Act and Assert
        await expect(async () => {
            await download.fileFromUrl(url, path, fileName)
        }).rejects.toThrowError()
    })
    
    it("should download all images from HTML elements and save them to a given path", async () => {
        // Create HTML element for testing
        const element = document.createElement('div')
        element.innerHTML = `
        <img src="https://example.com/image1.jpg" />
        <img src="https://example.com/image2.jpg" />
        <img src="https://example.com/image1.jpg" />
  `
        // Arrange
        const elements = [element]
        const path = "./downloads/"
        const fileName = "image.jpg"
        
        // Act
        await download.getAllImages(elements, path, fileName)
        
        // Assert
        // You may need to implement a file system check to verify that the images were downloaded
        // For example, you could use fs.stat or fs.access to check if the image files exist
        // and throw an error if they do not
    })
    
    // You can add more test cases to cover other methods and scenarios as needed

    afterEach(() => {
        // Clean up any files created during tests
        // You may need to implement this based on your actual file system
    })
})
 */