import { AppRouter } from "./AppRouter/AppRouter";
import { ThemeProvider } from "styled-components";
import { theme } from "./themes/theme";
import GlobalStyles from "./themes/globalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<AppRouter />
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
