import React, { lazy, Suspense } from "react"
import { Page } from "../../components/page"

const DataTable = lazy(() => import("./data-table"))

export function HomePage() {
	return (
		<Page header="Crypto markets home">
			<Suspense fallback={<div>Loading</div>}>
				<DataTable />
			</Suspense>
		</Page>
	)
}
