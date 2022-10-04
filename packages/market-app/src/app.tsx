import React from "react"
import { Box, Container } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home/home-page"
import { NotFoundPage } from "./pages/404/404-page"
import { Header } from "./components/parts/Header/header"

export function App() {
	return (
		<Box>
			<Header />
			<Container
				maxWidth="xl"
				sx={{
					mt: 2,
					display: "grid",
					// gridTemplateColumns: "minmax(250px, 20%)  1fr",
					gap: "20px",
				}}
			>
				{/*<Box component="nav">*/}
				{/*	<Navigation />*/}
				{/*</Box>*/}
				<Box component="main">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="home" element={<HomePage />} />
						{/*<Route path="sell" element={<SellPage/>}>*/}
						{/*	<Route path=":itemId" element={<SellPage/>}/>*/}
						{/*</Route>*/}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Box>
			</Container>
		</Box>
	)
}
