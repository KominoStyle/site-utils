import { isHTMLElement } from "../utils/checkFunctions"

describe('isHTMLElement', () => {
    test('should return true for an HTML element', () => {
        const div = document.createElement('div')
        const img = document.createElement('img')
        expect(isHTMLElement(div)).toBe(true)
        expect(isHTMLElement(img)).toBe(true)
    })

    test('should return false for a non-HTML element object', () => {
        const obj = { foo: 'bar' }
        expect(isHTMLElement(obj)).toBe(false)
    })

    test('should return false for null', () => {
        expect(isHTMLElement(null)).toBe(false)
    })

    test('should return false for undefined', () => {
        expect(isHTMLElement(undefined)).toBe(false)
    })
})