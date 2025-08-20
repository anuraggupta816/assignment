import axios from 'axios';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

const instance = axios.create({ baseURL: `${baseURL}/api`, withCredentials: true });

let bearerToken: string | null = localStorage.getItem('token');

instance.interceptors.request.use((config) => {
	if (bearerToken) {
		config.headers = config.headers || {};
		(config.headers as any).Authorization = `Bearer ${bearerToken}`;
	}
	return config;
});

export const api = {
	setToken: (token: string | null) => {
		bearerToken = token;
	},
	async get(path: string, params?: any) {
		const res = await instance.get(path, { params });
		return res.data;
	},
	async post(path: string, body?: any) {
		const res = await instance.post(path, body);
		return res.data;
	},
	async put(path: string, body?: any) {
		const res = await instance.put(path, body);
		return res.data;
	},
	async del(path: string) {
		const res = await instance.delete(path);
		return res.data;
	}
}; 