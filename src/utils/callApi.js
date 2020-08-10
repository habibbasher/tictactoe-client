import axios from "axios";

const BASE_URI = "http://localhost:5000/api";

export function callAPI(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](`${BASE_URI}${path}`, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data.error);
      });
  });
}
