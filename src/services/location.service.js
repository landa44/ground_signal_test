import { apiClient } from "./api-client";

export const locationsService = {
  getLocations: async () => {
    try {
      return (await apiClient.get("/fakeData")).data;
    } catch (error) {
      throw error;
    }
  },
};
