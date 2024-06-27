import { TOKEN_COOKIE, JTE_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants";
import { http } from "@/api/http";
import { defineStore } from "pinia";
import { getCookie, setCookie } from '@/services/authService/CookieService'
import router from "@/router";

export const useAuthStore = defineStore('auth', {
    state(){
        return {
            tokenValue: getCookie(TOKEN_COOKIE),
            refreshTokenValue: "",
            expirationValue: "",
        }
    },
    getters: {
        isAuthenticated: (state) => {
            return !!state.tokenValue;
        }
    },
    actions: {
        async login(login) {
            try {
                const resp = await http.post("/api/Auth/login", login);
                // debugger;
                if (resp.status === 200) {
                    // debugger;
                    const { token, expiration, refreshToken } = resp.data;
                    this.tokenValue = token;
                    this.refreshTokenValue = refreshToken;
                    this.expirationValue = expiration;

                    setCookie(TOKEN_COOKIE, token);
                    setCookie(JTE_COOKIE, new Date(expiration).getTime());
                    setCookie(REFRESH_TOKEN_COOKIE, refreshToken );
                }
            } catch (error) {
                throw error;
            }
        },
        async updateRefreshToken() {
            try {
                // debugger;
                const refreshTeste = getCookie(REFRESH_TOKEN_COOKIE); 
                const tokenTeste = getCookie(TOKEN_COOKIE);

                const resp = await http.post("/api/Auth/refresh-token", { acessToken: tokenTeste, refreshToken: refreshTeste });

                if (resp.status === 200) {
                    const { token, expiration, refreshToken } = resp.data;
                    this.tokenValue = token;
                    this.refreshTokenValue = refreshToken;
                    this.expirationValue = expiration;

                    setCookie(TOKEN_COOKIE, token);
                    setCookie(JTE_COOKIE, new Date(expiration).getTime());
                    setCookie(REFRESH_TOKEN_COOKIE, refreshToken );
                }
            } catch {
                this.logout();
            }
        },
        async logout() {
            this.tokenValue = "";
            this.refreshTokenValue = "";
            this.expirationValue = "";

            router.push("/login");
        }
    },
});
