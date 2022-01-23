import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

let pendingRequestsCount = 0;

function requestInterceptHandler() {
  if (pendingRequestsCount === 0) {
    document.querySelector('body').style.cursor = 'wait';
  }

  pendingRequestsCount++;
}

function responseInterceptHandler() {
  pendingRequestsCount--;

  if (pendingRequestsCount === 0) {
    document.querySelector('body').style.cursor = 'default';
  }
}

axios.interceptors.request.use(config => {
  requestInterceptHandler();
  
  return config;
}, error => {
  requestInterceptHandler();

  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  responseInterceptHandler();

  return response;
}, error => {
  responseInterceptHandler();

  return Promise.reject(error);
});
