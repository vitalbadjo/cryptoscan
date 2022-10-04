import { HuobiController } from "./huobi"

test("Test huobi controller", async () => {
	const result = await new HuobiController().getMarketData()
	expect(result.length).toBeGreaterThan(0)
}, 100000)
