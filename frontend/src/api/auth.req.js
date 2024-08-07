import api, { getAuthToken, setAuthToken } from "./index";

export const fetchUserDetails = async () => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (response?.data?.accessToken) {
    setAuthToken(response.data.accessToken);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
  }
  return response;
};


export const googleSignIn = (creds) => api.post("/auth/google", creds);


export const googleLogin = (userInfo) =>
  api.post(`/auth/login/google`, userInfo);


