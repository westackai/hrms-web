import { postRequest,getRequest, deleteRequest, putRequest } from "./ApiRequest"
import { ENDPOINTS } from "./Endpoints"

// Employee APIs
export const showAllEmployees = () => {
  return getRequest(ENDPOINTS.GET_ALL_EMPLOYEES);
};

export const createEmployee = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_EMPLOYEE, payload)
}


// Department APIs
export const showAllDepartments = () => {
  return getRequest(ENDPOINTS.GET_ALL_DEPARTMENT);
};

// Designation APIs
export const showAllDesignations = () => {
  return getRequest(ENDPOINTS.GET_ALL_DESIGNATION);
}