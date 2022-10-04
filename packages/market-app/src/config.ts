import { Market } from "@vitalbadjo/market-controller"

type AppConfig = {
	marketsToRetrieve: Market[]
	goodPercentLimit: string
	globalExcludeAssets: string[]
}

export const APP_CONFIG: AppConfig = {
	marketsToRetrieve: ["Binance", "Huobi"],
	goodPercentLimit: "1",
	globalExcludeAssets: ["USDC", "EUR", "TRY", "RUB", "USD", "UAH", "GBP"],
}
