import { BrowserRouter, Routes, Route } from "react-router";
import { DraftList } from "../components/DraftList/DraftList";
// import { DraftItem } from "../components/DraftItem/DraftItem";
import { DraftProfile } from "../components/DraftProfile/DraftProfile";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<h1>home</h1>} />

				<Route path="drafts">
					<Route index element={<DraftList />} />
					<Route path=":id" element={<DraftProfile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
