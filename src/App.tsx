import { AppRouter } from "./AppRouter/AppRouter";
import { ThemeProvider } from "styled-components";
import { theme } from "./themes/theme";
import GlobalStyles from "./themes/globalStyles";

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<AppRouter />
			</ThemeProvider>
		</>
	);
}

export default App;
