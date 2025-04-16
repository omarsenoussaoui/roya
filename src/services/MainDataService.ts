// services/MainDataService.ts

import api from "../api/api";

const MainDataService = {
  processFile: async (formData: FormData) => {
    // Extract query parameters from FormData
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
};

export default MainDataService;
