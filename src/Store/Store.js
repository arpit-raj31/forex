import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    userId: "",
    active: false,
    token: null,
  },

 
  setUsername: (username) =>
    set((state) => ({
      auth: { ...state.auth, username },
    })),


  setUserId: (userId) => {
    localStorage.setItem("userId", userId);
    set((state) => ({
      auth: { ...state.auth, userId, active: !!state.auth.token },
    }));
  },


  setToken: (token) => {
    localStorage.setItem("token", token);
    set((state) => ({
      auth: { ...state.auth, token, active: true },
    }));
  },


  loadToken: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set((state) => ({
        auth: { ...state.auth, token, active: true },
      }));
    }
  },


  loadUserId: () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      set((state) => ({
        auth: { ...state.auth, userId, active: !!state.auth.token },
      }));
    }
  },

 
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    set({
      auth: {
        username: "",
        userId: "",
        active: false,
        token: null,
      },
    });
  },
}));


useAuthStore.getState().loadToken();
useAuthStore.getState().loadUserId();