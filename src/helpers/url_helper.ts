//LOGIN
export const AUTH_LOGIN = "/api/v1/auth/login";

// Log Out
export const LOG_OUT = "/api/v1/auth/logout"

// Admin
export const GET_ADMIN_BY_ID = "/api/v1/auth/profile";
export const UPDATE_ADMIN = "/api/v1/admin/update";
export const CREATE_ADMIN = "/api/v1/admin/create-admin";
export const BLOCK_ADMIN = "/api/v1/admin/block";
export const UNBLOCK_ADMIN = "/api/v1/admin/unblock";
export const CHANGE_PASSWORD = "/api/v1/admin/change/own/password-username";
export const GET_ALL_ADMINS = "/api/v1/admin/findAllAdmin";

//product
export const GET_PRODUCT = "/api/v1/products/search";
export const GET_PRODUCT_BY_ID = "/api/v1/products/findById";
export const ADD_NEW_PRODUCT = "/api/v1/products/create";
export const DELETE_PRODUCT = "/api/v1/products/delete";
export const UPDATE_PRODUCT = "/api/v1/products/update";

// Get LMS Statistics
export const GET_OVERALL_LIST = "/api/v1/statistics/overall";

// Department 
export const GET_DEPARTMENT_LIST = "/api/v1/department/find-all";
export const GET_DEPARTMENT_BY_ID = "/api/v1/department/find-by-id"
export const ADD_DEPARTMENT_LIST = "/api/v1/department/create";
export const UPDATE_DEPARTMENT_LIST = `/api/v1/department/update`;
export const DELETE_DEPARTMENT_LIST = "/api/v1/department/delete";
export const DEPARTMENT_PAGINATION = "/api/v1/department/pagination"
export const DEPARTMENT_QR_CODE = "/api/v1/qr-code/download/rate"

// Faculty 
export const GET_FACULTY_LIST = "/api/v1/faculty-centre/findAll";
export const ADD_FACULTY_LIST = "/api/v1/faculty-centre/create";
export const UPDATE_FACULTY_LIST = "/api/v1/faculty-centre/update";
export const DELETE_FACULTY_LIST = "/api/v1/faculty-centre/delete";
export const FACULTY_PAGINATION = "/api/v1/faculty-centre/pagination"
export const FACULTY_QR_CODE = "/api/v1/qr-code/download/rate/faculty";

// Users Rate
export const GET_USERS_RATE = "/api/v1/rate/filter"


// Application
export const GET_APPLICATION_LIST = "/api/v1/application/filter";
export const DELETE_APPLICATION = "/api/v1/application/delete";
export const CHANGE_APPLICATION_STATUS = "/api/v1/application/change-status";
export const MEET_APPLICATION = "/api/v1/application/meet-at";
export const APPLICATION_QR_CODE = "/api/v1/qr-code/download/apply"

// Rector
export const GET_RECTOR_LIST = "/api/v1/rektor-qabul/findAll";
export const GET_RECTOR_BY_ID = "/api/v1/rektor-qabul/findById";
export const DELETE_RECTOR = "/api/v1/rektor-qabul/delete";
export const UPDATE_RECTOR = "/api/v1/rektor-qabul/update";
export const CREATE_RECTOR = "/api/v1/rektor-qabul/apply";

