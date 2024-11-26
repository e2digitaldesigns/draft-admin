import axios from "axios";
import { toast } from "react-toastify";

const httpService = axios.create({
	baseURL: import.meta.env.VITE_APP_REST_SERVICE || "",
	timeout: 30000,
	headers: { "Content-Type": "application/json" }
});

httpService.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem(import.meta.env?.REACT_APP_JWT_TOKEN || "");

		if (token) {
			config.headers.authorization = `bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

httpService.interceptors.response.use(null, error => {
	const expectedError =
		error.response && error.response.status >= 400 && error.response.status < 500;

	if (!expectedError) {
		console.error("Logging the error", error);
	}

	if (error) {
		toast("API Error, please try again later...", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "dark",
			type: "error"
		});
	}

	return Promise.reject(error);
});

export default httpService;
