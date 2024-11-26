import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTdjODcxMTNkMmNjOGRkNDVmYjIyNmUyYmYzNzI1YiIsIm5iZiI6MTczMDU1MDkzMi4wMzU3Mzg3LCJzdWIiOiI2NzI1ZmZlNmU3MjU4NDhhMTkzYWI2ZDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Wxoln4HW744HZwBQocUfUGhVtFAZc_PpXK8mqa4yEUI",
      },
});

export default instance;