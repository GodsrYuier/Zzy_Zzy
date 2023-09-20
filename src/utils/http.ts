import axios from "axios";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus";
const config = {
  baseURL: "http://interview-api-t.itheima.net/",
};

class Requst {
  instance: any;
  loading: any;
  constructor(config: any) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use((config: any) => {
      let token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      this.loading = ElLoading.service({
        lock: true,
        text: "加载中 ",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return config;
    });
    this.instance.interceptors.response.use((res: any) => {
      if (res.data.code === 10000) {
        ElMessage({
          message: res.data.message,
          type: "success",
        });
      } else {
        ElMessage.error(res.data.message);
      }
      this.loading.close();

      return res;
    });
  }
  get(url: string, params: any) {
    return this.instance.get(url, params);
  }
  post(url: string, params: any) {
    return this.instance.post(url, params);
  }
  put(url: string, params: any) {
    return this.instance.put(url, params);
  }
  delete(url: string, data: any) {
    return this.instance.delete(url, data);
  }
}

export default new Requst(config);
