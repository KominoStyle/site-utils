import { isString } from "../utils/checkFunctions"

describe('isString function', () => {
    it('should return true for a string value', () => {
        expect(isString('hello')).toBe(true)
        expect(isString('world')).toBe(true)
        expect(isString('123')).toBe(true)
    })

    it('should return false for non-string values', () => {
        expect(isString(123)).toBe(false)
        expect(isString(null)).toBe(false)
        expect(isString(undefined)).toBe(false)
        expect(isString([])).toBe(false)
        expect(isString({})).toBe(false)
        expect(isString(true)).toBe(false)
        expect(isString(false)).toBe(false)
        expect(isString(() => { })).toBe(false)
    })
})
