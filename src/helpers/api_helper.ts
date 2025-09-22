import axios, { AxiosResponse } from "axios";
import { log } from "console";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;


// intercepting to capture errors
axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        let message;
        const status = error.response ? error.response.status : null;

        switch (status) {
            case 500:
                message = "Internal Server Error";
                break;
            case 401:
                logoutUser();
                message = "Invalid credentials";
                break;
            case 404:
                message = "Sorry! The data you are looking for could not be found";
                break;
            default:
                message = error.message || "Something went wrong";
        }
        return Promise.reject(message);
    }
);

class APIClient {
    get = (url: any, params: any) => {
        let response;

        let paramKeys: any = [];

        if (params) {
            Object.keys(params).map(key => {
                paramKeys.push(key + '=' + params[key]);
                return paramKeys;
            });

            const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }

        return response;
    };


    // Overall
    getOverall = (url: any, data: any) => {
        return axios.get(`${url}`, data);
    }

    getConfirmation = (url: any, data: any) => {
        return axios.post(url + "?page=0&size=10", data);
    }

    getProduct = (url: any, pagination: any, data: any) => {
        return axios.post(`${url}?page=${pagination.page}&size=${pagination.size}`, data);
    }

    // getAlumni = (url: any, pagination: any, data: any) => {
    //     console.log(pagination, data)
    //     return axios.post(`${url}?page=${pagination.page}&size=${pagination.size}`, data);
    // }

    getNews = (url: any, pagination: any, data: any) => {
        return axios.post(`${url}?page=${pagination.page}&size=${pagination.size}`, data);
    }

    getProductById = (url: any, id: any) => {
        const newUrl = `${url}/${id}`;
        return axios.get(newUrl);
    }
    getNewsById = (url: any, id: any) => {
        const newUrl = `${url}/${id}`;
        return axios.get(newUrl);
    }

    create = (url: any, data: any) => {
        console.log(url, data);
        return axios.post(url, data);
    };

    updateByID = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers })
    }

    updateColor = (url: any, data: any) => {
        return axios.post(url, data);
    }

    deleteById = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }

    // create Product

    createProduct = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };

    createCategory = (url: any, data: any) => {
        let headers: { [key: string]: string } = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        return axios.post(url, data, { headers });
    };


    // Login
    authLogin = (url: any, data: any) => {
        return axios.post(url, data);
    };

    // LogOut
    logOut = (url: any) => {
        return axios.post(url)
    };

    // Admin
    getAdminById = (url: any) => axios.get(url);

    updateAdmin = (url: any, data: any) => {
        let headers: any = {};
        if (data instanceof FormData) headers["Content-Type"] = "multipart/form-data";
        return axios.post(url, data, { headers });
    };

    createAdmin = (url: any, data: any) => axios.post(url, data);

    blockAdmin = (url: any, adminId: number) => axios.post(`${url}/${adminId}`);

    unblockAdmin = (url: any, adminId: number) => axios.post(`${url}/${adminId}`);

    changePassword = (url: any, data: any) => axios.post(url, data);

    getAllAdmins = (url: any) => axios.get(url);

    /**
     * Updates data
     */
    update = (url: any, data: any) => {
        return axios.patch(url, data);
    };

    put = (url: any, data: any) => {
        return axios.put(url, data);
    };
    /**
     * Delete
     */
    delete = (url: any, config: any) => {
        return axios.delete(url, { ...config });
    };

    // Department
    getDepartment = (url: any) => {
        return axios.get(url)
    };

    departmentPagination = (url: any, data: { page: number; size: number }) => {
        return axios.get(`${url}?page=${data.page}&size=${data.size}`);
    };

    getDepartmentById = (url: any, id: any) => {
        return axios.get(`${url}/${id}`);
    };

    createDepartment = (url: any, data: any) => {
        return axios.post(url, data);
    };

    updateDepartment = (url: any, { id, updateFormData }: any) => {
        return axios.post(`${url}/${id}`, updateFormData);
    }

    deleteDepartment = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }

    createDepartmentQrCode = (url: string, departmentId: any) => {
        return axios.post(`${url}/${departmentId}`, null, {
            responseType: "blob",
        });
    };



    // Faculty
    getFaculty = (url: any) => {
        return axios.get(url);
    }

    facultyPagination = (url: any, data: { page: number; size: number }) => {
        return axios.get(`${url}?page=${data.page}&size=${data.size}`);
    };

    createFaculty = (url: any, data: any) => {
        console.log(data);
        return axios.post(url, data);
    };

    updateFaculty = (url: any, { id, updateFormData }: any) => {
        return axios.post(`${url}/${id}`, updateFormData);
    }

    deleteFaculty = (url: any, id: any) => {
        return axios.post(url + "/" + id)
    }

    // Users Rate
    getUsersRate = (url: any, data: any) => {
        return axios.get(`${url}?page=${data.page}&size=${data.size}`);
    }

    // Application
    getApplication = (url: any, data: any, params?: any) => {
        return axios.get(`${url}?page=${data.page}&size=${data.size}`, { params });
    };

    // applyApplication = (url: any, data: any) => {
    //     return axios.post(url, data);
    // };

    deleteApplication = (url: any, id: number) => {
        return axios.post(`${url}/${id}`);
    };

    changeApplicationStatus = (url: any, id: number, status: string) => {
        return axios.post(`${url}/${id}`, null, {
            params: { status }
        });
    };

    setApplicationMeeting = (url: any, id: number, meetAt: string) => {
        return axios.post(`${url}/${id}`, null, {
            params: { meetAt }
        });
    };

    getApplicationQrCode = (url: any) => {
        return axios.post(url, {}, {
            responseType: "blob",
        });
    };
}

const getLoggedInUser = () => {

    const user = localStorage.getItem("authAdmin");
    if (!user) {
        return null;
    } else {
        return JSON.parse(user);
    }
};

const logoutUser = () => {
    localStorage.removeItem("authAdmin");
    window.location.href = "/login";
}


export { APIClient, getLoggedInUser };