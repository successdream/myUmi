export const testApi = () => {
  return new Promise((resolve, reject) => {
    resolve({ test: '接口请求的假数据' });
  });
};
