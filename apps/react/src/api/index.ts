import axios from 'axios';

import { CONFIG } from './config';

/** JSDoc . */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
