export interface PriceData {
    date: number,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    adjclose: number
}

export interface yahooResponse {
    error: boolean,
    message?: string
    currency: string,
    response: PriceData[]
}