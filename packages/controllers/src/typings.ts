import type BigNumber from "bignumber.js"

export interface MarketController {
	getMarketData(): Promise<MarketData[]>
}

export type MarketData = {
	marketName: Market
	symbol: string
	baseAsset: string
	quoteAsset: string
	price: BigNumber
	ask: BigNumber
	askVolume: BigNumber
	bid: BigNumber
	bidVolume: BigNumber
}

export type Market =
	| "Kraken"
	| "Huobi"
	| "HotBit"
	| "Garantex"
	| "Kukoin"
	| "Mexc"
	| "Coinbase"
	| "CryptoCom"
	| "Cryptology"
	| "Bybit"
	| "OKX"
	| "CexIo"
	| "Binance"
