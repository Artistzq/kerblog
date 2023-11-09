import axios from 'axios';

function createAxiopsInstance(baseURL) {
  const axoisInstance = axios.create({
    baseURL: baseURL, // 你的后端API地址
    timeout: 10000, // 超时时间（单位：毫秒）,
    withCredentials: true,
  });
  return axoisInstance;
}

function configAxiosInstance(axoisInstance) {
  // 请求拦截器：在请求发送前可以做一些处理
  axoisInstance.interceptors.request.use(
    (config) => {
      // 在请求头中添加需要的信息，如认证信息、请求头等
      // config.headers['Authorization'] = 'Bearer your_token';

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axoisInstance.interceptors.response.use(
    (response) => {
      // 请求成功时的处理逻辑
      return response.data;
    },
    (error) => {
      // 请求失败时的处理逻辑
      if (error.response) {
        // 服务器返回了一个非成功状态码
        if (error.response.status === 401) {
          // 处理身份验证错误，例如跳转到登录页面
          // router.push('/login');
        } else if (error.response.status === 404) {
          // 处理资源未找到错误
        }
        // 其他状态码处理...
        console.error('错误：', error);
      } else if (error.request) {
        // 请求已经发出，但没有收到响应
        // 处理网络错误
        console.error('网络错误：', error.request);
      } else {
        // 发生了一些其他错误
        console.error('错误：', error.message);
      }
      return Promise.reject(error);
    }
  );
}


// 定义具体的请求方法
function api(baseURL) {
  const axoisInstance = createAxiopsInstance(baseURL);
  configAxiosInstance(axoisInstance);
  return {
    get(url, params={}) {
      return axoisInstance.get(url, { params });
    },
    post(url, data, config={}) {
      
      return axoisInstance.post(url, data, config);
    },
    put(url, data) {
      return axoisInstance.put(url, data);
    },
    delete(url) {
      return axoisInstance.delete(url);
    },
  };
}

export default api;