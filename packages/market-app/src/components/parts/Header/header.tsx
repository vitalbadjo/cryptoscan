import React from "react"
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material"

export function Header() {
	const links = [
		{
			label: "Home",
			path: "/home",
			default: true,
		},
	]
	return (
		<AppBar position={"static"}>
			<Container maxWidth={"xl"} disableGutters>
				<Toolbar>
					{/*<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0, display: "flex" }}>*/}
					{/*	Crypto markets app*/}
					{/*</Typography>*/}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{links.map(link => (
							<Button href={link.path} key={link.label} sx={{ my: 2, color: "white", display: "block" }}>
								{link.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
