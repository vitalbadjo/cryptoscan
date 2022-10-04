import type { Market, MarketController, MarketData } from "./typings"
import { BinanceController } from "./controllers/binance"
import { HuobiController } from "./controllers/huobi"

export function getMarketRates(markets: Market[]): Promise<MarketData[][]> {
	return Promise.all(markets.map(m => controllers[m]?.getMarketData() || []))
}
export { Market, MarketData } from "./typings"
export const controllers: Partial<Record<Market, MarketController>> = {
	Binance: new BinanceController(),
	Kraken: undefined,
	Huobi: new HuobiController(),
	HotBit: undefined,
	Garantex: undefined,
	Kukoin: undefined,
	Mexc: undefined,
	Coinbase: undefined,
	CryptoCom: undefined,
	Cryptology: undefined,
	Bybit: undefined,
	OKX: undefined,
	CexIo: undefined,
}
