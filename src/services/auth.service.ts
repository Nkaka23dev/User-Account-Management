import axios from "axios";
import { api } from "../utils/api";

export class AuthServices {
  signUp = (data: any) => {
    return api.post("/users/signup", {
      email: data.email,
      password: data.password,
      birth: data.birth,
      nationality: data.nationality,
      martal_status: data.martal_status,
      names: data.names,
      photo: data.photo,
      gender: data.gender,
    });
  };

  signIn = ({ email, password }: any) => {
    return api.post("/users/signin", { email, password });
  };

  verify2faToken = ({ code }: any) => {
    return api.post("/users/verify2fa", { code });
  };

  getCurrentUser = ({ fresh }: any) => {
    return api.post(`/users/current-user`, {
      fresh,
    });
  };

  refreshToken = () => {
    return axios.post(
      `${import.meta.env.VITE_API_URL}/users/refresh-token`,
      {},
      {
        headers: {
          Authorization: `beareer ${localStorage.getItem("refresh_token")}`,
        },
      }
    );
  };

  signInWithGoogle = async (token) => {
    return api.post("/api/auth", { token });
  };

  updateProfile = async (data) => {
    return api.post(`/users/update`, {
      ...data,
    });
  };

  googleSignin = async ({ token }) => {
    return api.post(`/users/google`, {
      token,
    });
  };

  changePassword = async ({ new_password, old_password }) => {
    return api.post(`/users/change-password`, {
      new_password,
      old_password,
    });
  };
  forgotPassword = async ({ email }) => {
    return api.post(`/users/forgot-password`, {
      email,
    });
  };
  resetPassword = async ({ password, token }) => {
    return api.post(`/users/reset-password`, {
      password,
      token,
    });
  };
  verifyUser = async ({ file, national_id }) => {
    return api.post(`/users/verify`, {
      file,
      national_id,
    });
  };
  sendLoginLink = async ({ email }) => {
    return api.post(`/users/send-login-link`, {
      email,
    });
  };
  verifyLoginLink = async ({ token }) => {
    return api.post(`/users/verify-login-link`, {
      token,
    });
  };
}
export const authService = new AuthServices();
