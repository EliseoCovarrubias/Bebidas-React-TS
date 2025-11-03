import { z } from "zod";
import {
	CategoriesAPIResponseSchema,
	DrinksAPIResponse,
	DrinkAPIResponse,
	SearchFilterSchema,
	RecipeAPIResponseSchema,
} from "../utils/recipes-schema";

// Tipado para categorías
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;

// Tipado para filtros de búsqueda
export type SearchFilter = z.infer<typeof SearchFilterSchema>;

// Tipado para lista de bebidas
export type Drinks = z.infer<typeof DrinksAPIResponse>;

// Tipado para una bebida
export type Drink = z.infer<typeof DrinkAPIResponse>;

// Tipado para detalle de receta
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
