// src/actions/vehicles/get-vehicles-by-page.action.ts
import { defineAction, z } from 'astro:actions';

export const getVehiclesByPage = defineAction({
  accept: 'json',
  input: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(10),
    make: z.string().optional(), // Agregado filtro por marca
  }),

  handler: async ({ page, limit, make }) => {
    page = page <= 0 ? 1 : page;

    // Calcula el offset para la paginación
    const offset = (page - 1) * limit;

    // Construye la URL de la API con el filtro de marca
    let url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=${limit}&offset=${offset}&lang=es&timezone=America%2FSantiago`;

    if (make) {
      url += `&refine=make:"${make}"`;
    }

    // Realiza la llamada a la API
    const response = await fetch(url);
    const data = await response.json();

    // Asegúrate de que la estructura de datos coincide con lo que esperas
    const vehicles = data.results || [];
    const totalRecords = data.total_count || 0;
    const totalPages = Math.ceil(totalRecords / limit);

    // Retorna los vehículos y la información de paginación
    return {
      vehicles: vehicles,
      totalPages: totalPages,
    };
  },
});
