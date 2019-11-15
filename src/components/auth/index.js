import { API } from "../../config";
import jwt from "jsonwebtoken";

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => {
        console.log("signout", response);
      })
      .catch(error => console.log(error));
  }
};

export const isAuthenticated = () => {
  if (typeof window === undefined) return false;

  if (localStorage.getItem("jwt")) {
    const jwtLS = JSON.parse(localStorage.getItem("jwt"));

    const decodedToken = jwt.decode(jwtLS.token, { complete: true });
    const dateNow = Math.round(new Date().getTime() / 1000);
    //@ts-ignore
    if (decodedToken.payload.exp < dateNow) return false;
    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};

export const oauthGoogle = data => {
  console.log(data, "oauthGoogle call");
  return fetch(`${API}/oauth/google`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const oauthFacebook = data => {
  return fetch(`${API}/oauth/facebook`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const requestPasswordUpdateToken = email => {
  return fetch(`${API}/auth/request-pass-token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(email)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const passwordUpdate = (password, token) => {
  return fetch(`${API}/auth/check-pass-token/${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({ password })
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
