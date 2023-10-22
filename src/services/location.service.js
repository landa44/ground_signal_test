import { apiClient } from "./api-client";

export const locationsService = {
  getLocations: async () => {
    try {
      const response = await apiClient.get("/fakeData");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
