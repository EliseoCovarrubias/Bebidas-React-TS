import { z } from "zod";

// Respuesta de categorías
export const CategoriesAPIResponseSchema = z.object({
	drinks: z.array(
		z.object({
			strCategory: z.string(), // Nombre de la categoría
		})
	),
});

// Filtros de búsqueda
export const SearchFilterSchema = z.object({
	ingredient: z.string(), // Ingrediente
	category: z.string(), // Categoría
});

// Bebida individual
export const DrinkAPIResponse = z.object({
	idDrink: z.string(), // ID
	strDrink: z.string(), // Nombre
	strDrinkThumb: z.string(), // Imagen
});

// Lista de bebidas
export const DrinksAPIResponse = z.object({
	drinks: z.array(DrinkAPIResponse), // Arreglo de bebidas
});

// Detalle de receta
export const RecipeAPIResponseSchema = z.object({
	idDrink: z.string(),
	strDrink: z.string(),
	strDrinkThumb: z.string(),
	strInstructions: z.string(),
	strIngredient1: z.string().nullable(),
	strIngredient2: z.string().nullable(),
	strIngredient3: z.string().nullable(),
	strIngredient4: z.string().nullable(),
	strIngredient5: z.string().nullable(),
	strIngredient6: z.string().nullable(),
	strMeasure1: z.string().nullable(),
	strMeasure2: z.string().nullable(),
	strMeasure3: z.string().nullable(),
	strMeasure4: z.string().nullable(),
	strMeasure5: z.string().nullable(),
	strMeasure6: z.string().nullable(),
});
