import React, { useEffect, useState } from "react"
import { controllers, getMarketRates } from "@vitalbadjo/market-controller"
import { calculateArb, CalculatedData } from "../../utils/calculate-arb"
import { APP_CONFIG } from "../../config"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const marketNames = Object.keys(controllers)
const columns: GridColDef[] = [
	{ field: "symbol", headerName: "Symbol" },
	...marketNames.map(el => ({ field: el, headerName: el, sortable: true })),
]

export default function DataTable() {
	const [data, setData] = useState<CalculatedData>([])

	useEffect(() => {
		let mounted = true
		getMarketRates(APP_CONFIG.marketsToRetrieve).then(d => {
			if (mounted) {
				setData(calculateArb(d, APP_CONFIG.goodPercentLimit))
			}
		})
		return () => {
			mounted = false
		}
	}, [])

	const rows = data.map(({ symbol, markets }) => {
		const marketsObj = Object.fromEntries(
			marketNames.map(el => {
				const market = markets.find(mark => mark.market === el)
				return [el, market ? market.data.percentage.toString() : "none"]
			})
		)
		console.log("marketsObj", marketsObj)
		return {
			id: symbol,
			symbol: symbol.toUpperCase(),
			...marketsObj,
		}
	})

	return (
		<>
			<div style={{ height: "800px", width: "100%" }}>
				<DataGrid rows={rows} columns={columns} pageSize={50} rowsPerPageOptions={[50]} checkboxSelection />
			</div>
		</>
	)
}
