import fetch from 'dva/fetch';
import { isEmpty } from '../lang';
import serialize from './helpers/serialize';
import combineURL from './helpers/combineURL';
import isAbsoluteURL from './helpers/isAbsoluteURL';
import { apiBaseUrl } from '../../config';
import { Toast } from 'antd-mobile';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const timeout = (p, ms = 30 * 1000) =>
    Promise.race([
        p,
        wait(ms).then(() => {
            const error = new Error(`Connection timed out after ${ms} ms`);
            error.statusCode = 408;
            throw error;
        }),
    ]);

// Request factory
function request(url, options, method) {
    const { endpoint, ...rest } = interceptRequest(url, options, method);
    const xhr = fetch(endpoint, rest).then(interceptResponse);
    return timeout(xhr, request.defaults.timeout).catch((error) => {
        // return Promise.reject(error);

    });
}

request.defaults = {
    baseURL: apiBaseUrl,
    timeout: 10 * 5000,
    headers: {
        Accept: 'application/json',
    },
};

// Headers factory
const createHeaders = () => {
    const headers = {
        ...request.defaults.headers,
    };

    // const auth = JSON.parse(localStorage.getItem('auth'+sessionStorage.getItem("hid")));

    // const token = sessionStorage.getItem('token'); // <Michael> 登录location获取到的token存放l


    // if (auth) {
    //   // Toast.info(`请稍等: ${token}`, 2);
    //   // Toast.loading('');

    //   headers.Authorization = auth.Token;
    // } else if (token) {
    //   // <Michael>;
    //   // Toast.info(`请稍等: ${token}`, 2);
    //   // Toast.loading('');
    //   headers.Authorization = token;

    // }
    headers.Authorization = "app";
    return headers;
};

// Request interceptor
function interceptRequest(url, options, method) {
    let endpoint;
    if (isAbsoluteURL(url)) {
        endpoint = url;
    } else {
        endpoint = combineURL(request.defaults.baseURL, url);
    }

    let data = {
        method,
        endpoint,
        headers: createHeaders(),
    };

    if (!isEmpty(options)) {
        data = {
            ...data,
            ...options,
        };

        if (options.json) {
            data.headers['Content-Type'] = 'application/json;charset=utf-8';
            data.body = JSON.stringify(options.json);
        }

        if (options.form) {
            data.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            data.body = serialize(options.form);
        }

        if (options.body) {
            data.body = options.body;

            const auth = JSON.parse(localStorage.getItem('auth' + sessionStorage.getItem("hid")));

            if (auth) {
                if (auth && options.body instanceof FormData && !options.body.hasPatientid) {
                    // options.body.append('patientid', auth.Patientid);
                }
            }
        }

        if (options.params) {
            endpoint += `?${serialize(options.params)}`;
            data.endpoint = endpoint;
        }
    }

    return data;
}

// Response interceptor
/* eslint-disable consistent-return */
function interceptResponse(response) {
    return new Promise((resolve, reject) => {
        const emptyCodes = [204, 205];

        // Don't attempt to parse 204 & 205
        if (emptyCodes.indexOf(response.status) !== -1) {
            return resolve(response.ok);
        }

        if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType.includes('application/json')) {
                resolve(response.json());
            }

            resolve(response);
        }

        if (response.status === 401) {
            // return Toast.fail('认证信息已过期，请重新登录', 2, () => {
            // return Toast.fail('请重新登录', 2, () => { 
            localStorage.removeItem('auth' + sessionStorage.getItem("hid"));
            // sessionStorage.removeItem('token');
            location.reload();
            // TODO:跳转登录路由
            // });
        }

        const error = new Error(response.statusText);
        try {
            response.clone().json().then((result) => {
                error.body = result;
                error.response = response;
                reject(error);
            });
        } catch (e) {
            error.response = response;
            reject(error);
        }
    });
}
/* eslint-enable consistent-return */

// suger
request.get = (url, options) => request(url, options, 'GET');

request.head = (url, options) => request(url, options, 'HEAD');

request.options = (url, options) => request(url, options, 'OPTIONS');

request.post = (url, options) => request(url, options, 'POST');

request.put = (url, options) => request(url, options, 'PUT');

request.delete = (url, options) => request(url, options, 'DELETE');

request.del = request.delete;

export default request;
