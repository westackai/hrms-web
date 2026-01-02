import { postRequest, getRequest, deleteRequest, putRequest } from "./ApiRequest"
import { ENDPOINTS } from "./Endpoints"

// Employee APIs
export const showAllEmployees = () => {
  return getRequest(ENDPOINTS.GET_ALL_EMPLOYEES);
};

export const createEmployee = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_EMPLOYEE, payload)
}

export const updateUser = (uuid: string, payload: any) => {
  return putRequest(`${ENDPOINTS.UPDATE_EMPLOYEE}/${uuid}`, payload);
};


// Department APIs
export const showAllDepartments = () => {
  return getRequest(ENDPOINTS.GET_ALL_DEPARTMENT);
};

export const createDepartment = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_DEPARTMENT, payload)
}

export const updateDepartment = (id: string, payload: any) => {
  return putRequest(`${ENDPOINTS.UPDATE_DEPARTMENT}/${id}`, payload)
}

export const deleteDepartment = (id: string) => {
  return deleteRequest(`${ENDPOINTS.DELETE_DEPARTMENT}/${id}`)
}

// Designation APIs
export const showAllDesignations = () => {
  return getRequest(ENDPOINTS.GET_ALL_DESIGNATION);
}

export const createDesignation = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_DESIGNATION, payload)
}

export const updateDesignation = (id: string, payload: any) => {
  return putRequest(`${ENDPOINTS.UPDATE_DESIGNATION}/${id}`, payload)
}

export const deleteDesignation = (id: string) => {
  return deleteRequest(`${ENDPOINTS.DELETE_DESIGNATION}/${id}`)
}

// Branch APIs
export const showAllBranches = () => {
  return getRequest(ENDPOINTS.GET_ALL_BRANCHES);
};

export const createBranch = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_BRANCH, payload)
}

export const updateBranch = (id: string, payload: any) => {
  return putRequest(`${ENDPOINTS.UPDATE_BRANCH}/${id}`, payload)
}

export const deleteBranch = (id: string) => {
  return deleteRequest(`${ENDPOINTS.DELETE_BRANCH}/${id}`)
}

// Shift APIs
export const showAllShifts = () => {
  return getRequest(ENDPOINTS.GET_ALL_SHIFTS);
};

export const createShift = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_SHIFT, payload)
}

export const updateShift = (id: string, payload: any) => {
  return putRequest(`${ENDPOINTS.UPDATE_SHIFT}/${id}`, payload)
}

export const deleteShift = (id: string) => {
  return deleteRequest(`${ENDPOINTS.DELETE_SHIFT}/${id}`)
}