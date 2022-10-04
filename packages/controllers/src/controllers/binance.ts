import axios from "axios"
import BigNumber from "bignumber.js"
import { CONFIG } from "../config"
import type { MarketController, MarketData } from "../typings"

export type BinanceSpotRatesResponse = {
	symbol: string
	price: string
}
async function getBinanceSpotRatesAll(exchangeInfo: BnbGetAssetsResponse[]): Promise<BinanceSpotRatesResponse[]> {
	const response = await axios.create().get(`${CONFIG.binance.apiBaseUrl}/api/v3/ticker/price`)
	if (response.status === 200) {
		return response.data.filter((el: BinanceSpotRatesResponse) => {
			const exchInfo = exchangeInfo.find(ex => ex.symbol.toLowerCase() === el.symbol.toLowerCase())
			if (exchInfo && (exchInfo.status !== "TRADING" || !exchInfo.isSpotTradingAllowed)) {
				return false
			}
			return true
		})
	} else {
		console.log("Status ", response.status)
		throw new Error(`Binance API getSpotRatesAll method error - ${response.statusText}`)
	}
}

export async function getSpotAssets(): Promise<BnbGetAssetsResponse[]> {
	const response = await axios.create().get(`${CONFIG.binance.apiBaseUrl}/api/v3/exchangeInfo`)
	if (response.status !== 200) {
		console.log("Status ", response.status)
		throw new Error(`Binance API getSpotAssets method error - ${response.statusText}`)
	}
	return response.data.symbols.map((e: ResponseSymbol) => {
		const { baseAsset, quoteAsset, symbol, status, isSpotTradingAllowed } = e
		return {
			baseAsset,
			quoteAsset,
			symbol,
			status,
			isSpotTradingAllowed,
		}
	})
}

export class BinanceController implements MarketController {
	constructor() {}
	async getMarketData(): Promise<MarketData[]> {
		const exchangeInfo = await getSpotAssets()
		const response = await getBinanceSpotRatesAll(exchangeInfo)
		return response.map(e => ({
			...e,
			price: new BigNumber(e.price),
			baseAsset: "",
			quoteAsset: "",
			marketName: "Binance",
			ask: new BigNumber(e.price),
			askVolume: new BigNumber(0),
			bid: new BigNumber(e.price),
			bidVolume: new BigNumber(0),
		}))
	}
}

export type ResponseSymbol = {
	symbol: string
	status: string
	baseAsset: string
	baseAssetPrecision: number
	quoteAsset: string
	quotePrecision: number
	quoteAssetPrecision: number
	baseCommissionPrecision: number
	quoteCommissionPrecision: number
	orderTypes: string[]
	icebergAllowed: boolean
	ocoAllowed: boolean
	quoteOrderQtyMarketAllowed: boolean
	allowTrailingStop: boolean
	cancelReplaceAllowed: boolean
	isSpotTradingAllowed: boolean
	isMarginTradingAllowed: boolean
	permissions: string[]
}
export type BnbGetAssetsResponse = {
	baseAsset: string
	quoteAsset: string
	symbol: string
	status: string
	isSpotTradingAllowed: boolean
}
