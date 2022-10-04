import { Market, MarketData } from "@vitalbadjo/market-controller/build/typings"
import BigNumber from "bignumber.js"
import { EXCLUDE_ASSETS } from "../config"

export function calculateArb(data: MarketData[][], percentageLimit: string): CalculatedData {
	const pLBn = new BigNumber(percentageLimit)
	const symbols: Set<string> = new Set()
	data.forEach(m => {
		m.forEach(s => symbols.add(s.symbol.toLowerCase()))
	})
	return Array.from<Symbol>(symbols)
		.filter(s => {
			let result = true
			EXCLUDE_ASSETS.forEach(asset => {
				if (s.endsWith(asset.toLowerCase()) || s.startsWith(asset.toLowerCase())) {
					result = false
				}
			})
			return result
		})
		.reduce<CalculatedData>((p, c, i) => {
			const symbolObj: SymbolObj = { symbol: c, markets: [] }
			data.forEach((mark, markInd) => {
				const market = mark.find(el => el.symbol.toLowerCase() === c.toLowerCase())
				if (market) {
					const percentage =
						markInd > 0 && symbolObj.markets[0]
							? market.ask.dividedBy(symbolObj.markets[0].data.ask).minus(1).multipliedBy(100).abs()
							: new BigNumber(0)

					symbolObj.markets.push({ market: market.marketName, data: { ...market, percentage } })
				}
			})
			if (symbolObj.markets.length > 1 && symbolObj.markets.filter(el => el.data.percentage.gte(pLBn)).length) {
				return [...p, symbolObj]
			}
			return p
		}, [])
}
type Symbol = string

type SymbolObj = {
	symbol: Symbol
	markets: {
		market: Market
		data: MarketData & {
			percentage: BigNumber
		}
	}[]
}
export type CalculatedData = SymbolObj[]
