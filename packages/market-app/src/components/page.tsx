import React from "react"
import { Typography } from "@mui/material"

export interface IPageProps {
	header?: string
}

export function Page({ header, children }: React.PropsWithChildren<IPageProps>) {
	return (
		<div>
			{header && (
				<Typography variant="h5" component="h1" gutterBottom>
					{header}
				</Typography>
			)}
			{children}
		</div>
	)
}
