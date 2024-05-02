type ServiceType = {
  name: string;
  prices: {
    typeId: string;
    unitPrice: number;
  }[];
};

const createService = async (token: string, service: ServiceType) => {};

const updateService = async (
  token: string,
  service: ServiceType,
  id: string
) => {};

const getAllServices = async (token: string) => {};

const deleteServiceById = async (token: string, id: string) => {};

export { createService, updateService, getAllServices, deleteServiceById };
