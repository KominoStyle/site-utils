import { MeasureTime } from "../utils/Measure-Time"

describe('MeasureTime', () => {
    const measureTime = new MeasureTime()

    it('should measure elapsed time of a synchronous function', () => {
        const time = measureTime.measure(() => {
            for (let i = 0;i < 1000000;i++) { } // Simple loop to create a delay
        })
        expect(time).toBeDefined()
    })

    it('should measure elapsed time of an asynchronous function', async () => {
        const time = await measureTime.measureAsync(async () => {
            return new Promise((resolve) => setTimeout(resolve, 100))
        })
        expect(time).toBeDefined()
    })

    it('should measure and log elapsed time', () => {
        console.log = jest.fn()
        const time = measureTime.measure(() => {
            for (let i = 0;i < 1000000;i++) { } // Simple loop to create a delay
        }, {})
        expect(console.log).not.toHaveBeenCalled()
    })

    it('should measure elapsed time accurately for a synchronous function', () => {
        const startTime = Date.now()
        measureTime.measure(() => {
            for (let i = 0;i < 1000000;i++) { } // Simple loop to create a delay
        })
        const endTime = Date.now()
        const elapsedTime = endTime - startTime
        expect(elapsedTime).toBeGreaterThanOrEqual(0)
    })

    it('should measure elapsed time accurately for an asynchronous function', async () => {
        const startTime = Date.now()
        await measureTime.measureAsync(async () => {
            return new Promise((resolve) => setTimeout(resolve, 100))
        })
        const endTime = Date.now()
        const elapsedTime = endTime - startTime
        expect(elapsedTime).toBeGreaterThanOrEqual(100)
    })

    it('should measure time taken for function execution', () => {
        const mockFunction = jest.fn(() => {
            for (let i = 0;i < 100000000;i++) {
                // Heavy computation
            }
        })
        const result = measureTime.measure(mockFunction)
        expect(mockFunction).toHaveBeenCalled()
        expect(typeof result).toBe('string')
        expect(result).toMatch(/[\d]+ms/)
    })

    it('should return formatted time for given duration in milliseconds', () => {
        const result = measureTime['elapsed'](Date.now() - 5000)
        expect(typeof result).toBe('string')
        expect(result).toMatch(/5s/)
    })

    it('should return a ThrowError because year & month, cant exsist with week', () => {
        expect(() => {
            measureTime['elapsed'](Date.now() - 3456789000, { year: true, month: true, week: true })
        }).toThrowError()
    })

    it('should return formatted time with years and months', () => {
        const result = measureTime['elapsed'](Date.now() - 31557600000, { year: true, month: true })
        expect(typeof result).toBe('string')
        expect(result).toMatch(/1y/)
    })

    it('should return formatted time with years', () => {
        const result = measureTime['elapsed'](Date.now() - 78894000000, { year: true })
        expect(typeof result).toBe('string')
        expect(result).toMatch(/2y/)
    })

    it('should return formatted time with months', () => {
        const result = measureTime['elapsed'](Date.now() - 2629746000, { month: true })
        expect(typeof result).toBe('string')
        expect(result).toMatch(/1m/)
    })

    it('should return formatted time with weeks', () => {
        const result = measureTime['elapsed'](Date.now() - 604800000, { week: true })
        expect(typeof result).toBe('string')
        expect(result).toMatch(/1w/)
    })

    it('should return formatted time with days, hours, minutes, seconds, and milliseconds', () => {
        const result = measureTime['formatTime'](86461000)
        expect(typeof result).toBe('string')
        expect(result).toMatch(/1d 1min 1s/)
    })

    it('should return formatted time with hours, minutes, seconds, and milliseconds', () => {
        const result = measureTime['formatTime'](3723000)
        expect(typeof result).toBe('string')
        expect(result).toMatch(/1h 2min 3s/)
    })
})