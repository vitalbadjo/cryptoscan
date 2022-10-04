import React from "react"
import { List } from "@mui/material"
import { ListItemLink } from "../common/list-item-link"

export function Navigation() {
	const links = [
		{
			label: "Home",
			path: "/home",
			default: true,
		},
	]

	return (
		<List>
			{links.map(link => (
				<ListItemLink key={link.path} to={link.path} primary={link.label} default={link.default} />
			))}
		</List>
	)
}
