import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseAPI = import.meta.env.VITE_URL_API as string;
// const baseAPI = "http://localhost:3000/api";

const header = (): { Authorization: string } => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function handleSuccess<T>(result: AxiosResponse<T>): T {
  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result.data;
}

function handleError(error: any): never {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("examinationRoom-storage");
    window.location.href = "/login";
  }
  throw (error.response && error.response.data) || error || "System Error";
}

const get = async <T>(url: string, filter: Record<string, any> = {}): Promise<T> => {
  const property: AxiosRequestConfig = {
    method: "GET",
    url: baseAPI + url,
    params: filter,
    headers: header(),
  };
  return axios(property)
    .then((response) => handleSuccess<T>(response))
    .catch((error) => handleError(error));
};

const post = async <T>(url: string, body: any): Promise<T> => {
  const property: AxiosRequestConfig = {
    method: "POST",
    url: baseAPI + url,
    headers: header(),
    data: body,
  };
  return axios(property)
    .then((response) => handleSuccess<T>(response))
    .catch((error) => handleError(error));
};

const patch = async <T>(url: string, body: any): Promise<T> => {
  const property: AxiosRequestConfig = {
    method: "PATCH",
    url: baseAPI + url,
    headers: header(),
    data: body,
  };
  return axios(property)
    .then((response) => handleSuccess<T>(response))
    .catch((error) => handleError(error));
};

const put = async <T>(url: string, body: any): Promise<T> => {
  const property: AxiosRequestConfig = {
    method: "PUT",
    url: baseAPI + url,
    headers: header(),
    data: body,
  };
  return axios(property)
    .then((response) => handleSuccess<T>(response))
    .catch((error) => handleError(error));
};

const del = async <T>(url: string, body?: any): Promise<T> => {
  const property: AxiosRequestConfig = {
    method: "DELETE",
    url: baseAPI + url,
    headers: header(),
    data: body,
  };
  return axios(property)
    .then((response) => handleSuccess<T>(response))
    .catch((error) => handleError(error));
};

/* eslint-disable */
export const http = {
  get,
  post,
  patch,
  put,
  del,
};
