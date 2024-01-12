const API_KEY = 'AhmedAsakrahmachtWebsite';
const BASE_URL = 'http://localhost:3000'; // Backend server URL

export const urlauth = `${BASE_URL}/${API_KEY}/api/auth`;

export const urlbook = `/${API_KEY}/api/book`;

export const urlreviewbook = `/${API_KEY}/api/review`;

export const urlSearch = `/${API_KEY}/api/search`;

export const urlFavourite = `/${API_KEY}/api/favourite`;

export const urlBookInfo = `/${API_KEY}/api/bookinfo`;

export const urlAdmin = `/${API_KEY}/api/admin`;

export const authToken = `${localStorage.getItem('token')}`;
