import axiosClient from "./ApiClient";


export const getRequest = (url: any) => {
  return axiosClient.get(url);
};

export const postRequest = (url: any, payload?: any) => {
  return axiosClient.post(url, payload);
};


export const putRequest = (url: any, payload?: any) => {
  return axiosClient.put(url, payload);
};

export const deleteRequest = (url: any) => {
  return axiosClient.delete(url);
};

export const patchRequest = (url: any, payload: any) => {
  return axiosClient.patch(url, payload);
};