// services/MainDataService.ts

import api from "../api/api";

const MainDataService = {
  processFile: async (formData: FormData) => {
    const queryParams = new URLSearchParams();

    const formDataForUpload = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key === 'file') {
        formDataForUpload.append('file', value);
      } else {
        queryParams.append(key, value.toString());
      }
    }

    const response = await api.post(`/process-file?${queryParams.toString()}`, formDataForUpload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },

  dataOverview: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/data-overview", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  sheetProfile: async (file: File, sheetName?: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const query = sheetName ? `?sheet_name=${encodeURIComponent(sheetName)}` : "";

    const response = await api.post(`/sheet-profile${query}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
  cleaning: async (formData: FormData) => {
    const queryParams = new URLSearchParams();
    const formDataForUpload = new FormData();
  
    for (const [key, value] of formData.entries()) {
      if (key === "file") {
        formDataForUpload.append("file", value);
      } else {
        queryParams.append(key, value.toString());
      }
    }
  
    const response = await api.post(`/cleaning?${queryParams.toString()}`, formDataForUpload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    return response.data;
  },
  transformation: async (formData: FormData) => {
    const queryParams = new URLSearchParams();
    const formDataForUpload = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key === "file") {
        formDataForUpload.append("file", value);
      } else {
        queryParams.append(key, value.toString());
      }
    }

    const response = await api.post(`/transformation?${queryParams.toString()}`, formDataForUpload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
  featureEngineering: async (formData: FormData) => {
    const queryParams = new URLSearchParams();
    const formDataForUpload = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key === 'file') {
        formDataForUpload.append('file', value);
      } else {
        queryParams.append(key, value.toString());
      }
    }

    const response = await api.post(`/feature-engineering?${queryParams.toString()}`, formDataForUpload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
  dataReduction: async (formData: FormData) => {
    const queryParams = new URLSearchParams();
    const formDataForUpload = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key === 'file') {
        formDataForUpload.append('file', value);
      } else {
        queryParams.append(key, value.toString());
      }
    }

    const response = await api.post(`/data-reduction?${queryParams.toString()}`, formDataForUpload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
  dataValidation: async (formData: FormData) => {
    const queryParams = new URLSearchParams();
    const formDataForUpload = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key === 'file') {
        formDataForUpload.append('file', value);
      } else {
        queryParams.append(key, value.toString());
      }
    }

    const response = await api.post(`/data-validation?${queryParams.toString()}`, formDataForUpload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
};

export default MainDataService;
