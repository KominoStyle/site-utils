//* !♥Koͨmͧiͭnͥoͤ Style♥! just made it as a class

type MeasureParameters<T extends (...args: any) => unknown> = [...Parameters<T>]
type ExpectOptions = {
    year?: boolean
    month?: boolean
    week?: boolean
}

export class MeasureTime {

    public async measureAsync<T extends (...args: any) => Promise<unknown>>(process: T,
        expect?: ExpectOptions, ...params: MeasureParameters<T>
    ) {
        const start = this.now()
        await process(...params)
        return this.elapsed(start, expect)
    }

    public measure<T extends (...args: any) => unknown>(process: T,
        expect?: ExpectOptions, ...params: MeasureParameters<T>) {
        const start = this.now()
        process(...params)
        return this.elapsed(start, expect)
    }

    // Returns current time
    private now() {
        return Date.now()
    }

    // Returns time elapsed since `beginning`
    // (and, optionally, prints the duration in seconds)
    private elapsed(beginning: number, expect?: ExpectOptions, log?: boolean) {
        const duration = this.now() - beginning //? this is for testing
        const formattedTime = this.formatTime(duration, expect)

        if (log) console.log(`${formattedTime}`)
        // return duration //? Origial???
        return formattedTime
    }

    private formatTime(
		duration: number,
        expect: ExpectOptions = {}
		) {

        if (duration < 0) throw new Error()
        
        if (expect.year && expect.week || expect.month && expect.week) throw new Error("Fuck You")
        const milliseconds = duration % 1000
        const seconds = Math.floor((duration / 1000) % 60)
        const minutes = Math.floor((duration / 1000 / 60) % 60)
        const hours = Math.floor((duration / 1000 / 60 / 60) % 24)
        let days: number
        const weeks = Math.floor(duration / 1000 / 60 / 60 / 24 / 7)
        let months = 0
        let years = 0

        switch (true) {
            case expect.week:
                days = Math.floor((duration / 1000 / 60 / 60 / 24) % 7)
                break
            case expect.year && expect.month:
                days = Math.floor((duration / 1000 / 60 / 60 / 24) % 30.436875)
                months = Math.floor((duration / 1000 / 60 / 60 / 24 / 30.436875) % 12)
                years = Math.floor(duration / 1000 / 60 / 60 / 24 / 30.436875 / 12)
                break
            case expect.year:
                days = Math.floor((duration / 1000 / 60 / 60 / 24) % 365.2425)
                years = Math.floor(duration / 1000 / 60 / 60 / 24 / 365.2425)
                break
            case expect.month:
                days = Math.floor((duration / 1000 / 60 / 60 / 24) % 30.436875)
                months = Math.floor(duration / 1000 / 60 / 60 / 24 / 30.436875)
                break
            default:
                days = Math.floor(duration / 1000 / 60 / 60 / 24)
                break
        }

        const units = [
            { value: years, symbol: "y", expected: expect.year ?? false, notAllowed: ["week"] },
            { value: months, symbol: "m", expected: expect.month ?? false, notAllowed: ["week"] },
            { value: weeks, symbol: "w", expected: expect.week ?? false, notAllowed: ["year", "month"] },
            { value: days, symbol: "d", expected: true, notAllowed: [] },
            { value: hours, symbol: "h", expected: true, notAllowed: [] },
            { value: minutes, symbol: "min", expected: true, notAllowed: [] },
            { value: seconds, symbol: "s", expected: true, notAllowed: [] },
            { value: milliseconds, symbol: "ms", expected: true, notAllowed: [] }
        ].filter(unit => unit.value > 0 && unit.expected && !unit.notAllowed.some(item => expect[item as keyof ExpectOptions]))

        if (units.some(unit => unit.symbol === "h" || unit.symbol === "d" || unit.symbol === "y" || unit.symbol === "m" || unit.symbol === "w")) {
            if (units.some(unit => unit.symbol === "ms")) units.splice(units.findIndex(unit => unit.symbol === "ms"), 1)
        }

        return units.map((unit) => {
            return `${unit.value}${unit.symbol}`
        }).join(" ")
    }
}

