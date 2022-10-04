import { BinanceController } from "./binance"

test("Test binance controller", async () => {
	const result = await new BinanceController().getMarketData()
	expect(result.length).toBeGreaterThan(0)
})
