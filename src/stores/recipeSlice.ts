import type { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";
import type { Categories, Drink, Drinks, SearchFilter, Recipe } from "../types";

// Slice para manejar recetas
export type RecipesSliceType = {
	categories: Categories;                        // Categorías de bebidas
	drinks: Drinks;                                // Lista de bebidas obtenidas
	selectedRecipe: Recipe;                        // Receta seleccionada
	modal: boolean;                                // Estado del modal de receta
	fetchCategories: () => Promise<void>;          // Obtiene las categorías
	searchRecipes: (searchFilters: SearchFilter) => Promise<void>; // Busca bebidas
	selectRecipe: (id: Drink["idDrink"]) => Promise<void>;          // Selecciona una receta por ID
	closeModal: () => void;                        // Cierra el modal
};

// Implementación del slice
export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
	categories: { drinks: [] },                    // Estado inicial de categorías
	drinks: { drinks: [] },                        // Estado inicial de bebidas
	selectedRecipe: {} as Recipe,                  // Estado inicial de receta
	modal: false,                                  // Modal cerrado por defecto

	// Cargar categorías desde la API
	fetchCategories: async () => {
		const categories = await getCategories();
		set({ categories });
	},

	// Buscar recetas según filtros
	searchRecipes: async (filters) => {
		const drinks = await getRecipes(filters);
		set({ drinks });
	},

	// Seleccionar receta y abrir modal
	selectRecipe: async (id) => {
		const selectedRecipe = await getRecipeById(id);
		set({
			selectedRecipe,
			modal: true
		});
	},

	// Cerrar modal y limpiar receta seleccionada
	closeModal: () => {
		set({
			modal: false,
			selectedRecipe: {} as Recipe
		});
	}
});
