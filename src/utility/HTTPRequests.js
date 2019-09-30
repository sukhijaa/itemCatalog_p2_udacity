import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

export const APIEndpoints = {
    DELETE_CATEGORY: '/category/:categoryId/delete',
    GET_ALL_CATEGORIES: '/getAllCategories',
};

export const buildURL = (path, pathParams = {}, queryParams = {}) => {
    Object.keys(pathParams).forEach(key => {
        path = path.replace(`:${key}`, encodeURIComponent(pathParams[key]));
    });
    Object.keys(queryParams)
        .filter(key => queryParams[key] !== null && typeof queryParams[key] !== 'undefined')
        .forEach((key, index) => {
            const param = encodeURIComponent(queryParams[key]);

            if (index === 0) {
                path = path + `?${key}=${param}`;
            } else {
                path = path + `&${key}=${param}`;
            }
        });
    return path;
};

const appendHost = (url) => {
  return isDevelopment ? 'http://localhost:5000' + url : url;
};

export const HTTP = {
    DELETE: (url) => {
        return axios.delete(appendHost(url))
    },
    POST: (url, data) => {
        return axios.post(appendHost(url), data)
    },
    GET: (url) => {
        return axios.get(appendHost(url))
    }
};