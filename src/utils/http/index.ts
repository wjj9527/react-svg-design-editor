import Axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import axiosRetry from 'axios-retry';

const client = Axios.create({
  timeout: 50000,
});
//失败重新请求
axiosRetry(client, { retries: 3 });

export const request = async (config: AxiosRequestConfig) => {
  try {
    const response = await client.request(config);
    console.log(response);
    const { data } = response;
    if (data.success !== 1) {
      message.error(data.message);
      return Promise.reject(response);
    }
    return data;
  } catch (err: any) {
    const response = err?.response;
    message.error('网络错误');
    return Promise.reject(response);
  }
};

export const $_get = (baseURL: string) => {
  return (url: string, data?: any, config?: AxiosRequestConfig) => {
    const method = 'GET';
    const headers =
      {
        'Content-Type': 'application/json',
      } || config?.headers;
    const responseType = 'json' || config?.responseType;
    const params = data;
    const axiosConfig = { ...config };
    Object.assign(axiosConfig, {
      url,
      method,
      headers,
      responseType,
      params,
      baseURL,
    });
    return request(axiosConfig);
  };
};

export const $_delete = (baseURL: string) => {
  return (url: string, data?: any, config?: AxiosRequestConfig) => {
    const method = 'DELETE';
    const headers =
      {
        'Content-Type': 'application/json',
      } || config?.headers;
    const responseType = 'json' || config?.responseType;
    const axiosConfig = { ...config };
    Object.assign(axiosConfig, {
      url,
      method,
      headers,
      responseType,
      params: data,
      baseURL,
    });
    return request(axiosConfig);
  };
};
export const $_post = (baseURL: string) => {
  return (url: string, data?: any, config?: AxiosRequestConfig) => {
    const method = 'POST';
    const headers =
      {
        'Content-Type': 'application/json',
      } || config?.headers;
    const responseType = 'json' || config?.responseType;
    const axiosConfig = { ...config };
    Object.assign(axiosConfig, {
      url,
      method,
      headers,
      responseType,
      data,
      baseURL,
    });
    return request(axiosConfig);
  };
};
export const $_put = (baseURL: string) => {
  return (url: string, data?: any, config?: AxiosRequestConfig) => {
    const method = 'PUT';
    const headers =
      {
        'Content-Type': 'application/json',
      } || config?.headers;
    const responseType = 'json' || config?.responseType;
    const axiosConfig = { ...config };
    Object.assign(axiosConfig, {
      url,
      method,
      headers,
      responseType,
      data,
      baseURL,
    });
    return request(axiosConfig);
  };
};

export const http = (baseURL: string) => {
  return {
    $get: $_get(baseURL),
    $delete: $_delete(baseURL),
    $put: $_put(baseURL),
    $post: $_post(baseURL),
  };
};
