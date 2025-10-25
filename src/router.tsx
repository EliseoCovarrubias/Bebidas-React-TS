import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

const IndexPage = lazy(() => import("./views/IndexPage"));
const FavoritesPage = lazy(() => import("./views/FavoritesPage"));
const GenerateAIPage = lazy(() => import("./views/GenerateAI"));

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={
						<Suspense fallback={<p>Cargando...</p>}>
							<IndexPage />
						</Suspense>
					} index />
					<Route path="/favoritos" element={
						<Suspense fallback={<p>Cargando...</p>}>
							<FavoritesPage />
						</Suspense>
					} />
				</Route>
				<Route element={<Layout />}>
					<Route path="/generar" element={
						<Suspense fallback={<p>Cargando...</p>}>
							<GenerateAIPage />
						</Suspense>
					} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
