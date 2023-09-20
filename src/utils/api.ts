import http from "./http";

interface login {
  username: string;
  password: string;
}
// 登录
export const getloginApi = (params: login) => http.post("/auth/login", params);
// 列表
export const getListApi = (params: any) =>
  http.get("/admin/interview/query", { params });
// 添加 /admin/interview/create
export const getAddApi = (params: any) =>
  http.post("/admin/interview/create", params);
// 删除 /admin/interview/remove
export const getDeleteApi = (data: any) =>
  http.delete("/admin/interview/remove", { data });
  // 编辑 /admin/interview/update
  export const getEditApi = (params: any) =>
  http.put("/admin/interview/update",  params );
