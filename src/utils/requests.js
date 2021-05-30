import fetch from 'dva/fetch';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseErrorMessage({ data }) {
    const { status, message } = data;
    if (status === 'error') {
        throw new Error(message);
    }
    return { data };
}

export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(parseErrorMessage)
        .then((data) => ({ data }))
        .catch((err) => ({ err }));
}
