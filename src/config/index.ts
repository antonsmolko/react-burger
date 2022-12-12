const BASE_DOMAIN = 'norma.nomoreparties.space';
const API_BASE_URL = `https:/${BASE_DOMAIN}/api`;
const WS_BASE_URL = `wss://${BASE_DOMAIN}`;
export const API_INGREDIENTS_URL = `${API_BASE_URL}/ingredients`;
export const API_ORDERS_URL = `${API_BASE_URL}/orders`;
export const PASSWORD_RESET_URL = `${API_BASE_URL}/password-reset/reset`;
export const PASSWORD_FORGOT_URL = `${API_BASE_URL}/password-reset`;
export const AUTH_REGISTER_URL = `${API_BASE_URL}/auth/register`;
export const AUTH_TOKEN_URL = `${API_BASE_URL}/auth/token`;
export const AUTH_USER_URL = `${API_BASE_URL}/auth/user`;
export const AUTH_LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const AUTH_LOGOUT_URL = `${API_BASE_URL}/auth/logout`;
export const MODAL_ANIMATION_TIME = 300;


export const WS_FEED_URL = `${WS_BASE_URL}/orders/all`;
export const WS_USER_FEED_URL = `${WS_BASE_URL}/orders`;
