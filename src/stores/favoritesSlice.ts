import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

// Slice para manejar favoritos
export type FavoritesSliceType = {
	favorites: Recipe[]; // Lista de recetas favoritas
	handleClickFavorite: (recipe: Recipe) => void; // Agrega o elimina un favorito
	favoriteExists: (id: Recipe["idDrink"]) => boolean; // Verifica si ya está en favoritos
	loadFromStorage: () => void; // Carga favoritos desde localStorage
};

// Implementación del slice
export const createFavoritesSlice: StateCreator<
	FavoritesSliceType & NotificationSliceType,
	[],
	[],
	FavoritesSliceType
> = (set, get, api) => ({
	favorites: [], // Estado inicial

	// Agrega o elimina una receta de favoritos
	handleClickFavorite: (recipe) => {
		if (get().favoriteExists(recipe.idDrink)) {
			// Si ya existe, eliminarla
			set((state) => ({
				favorites: state.favorites.filter(
					(fav) => fav.idDrink !== recipe.idDrink
				),
			}));
			// Notificación de eliminación
			createNotificationSlice(set, get, api).showNotification({
				text: "Se eliminó de favoritos",
				error: false,
			});
		} else {
			// Si no existe, agregarla
			set((state) => ({
				favorites: [...state.favorites, recipe],
			}));
			// Notificación de agregado
			createNotificationSlice(set, get, api).showNotification({
				text: "Se agregó a favoritos",
				error: false,
			});
		}

		// Guardar cambios en localStorage
		localStorage.setItem("favorites", JSON.stringify(get().favorites));
	},

	// Verifica si una receta está en favoritos
	favoriteExists: (id) => {
		return get().favorites.some((fav) => fav.idDrink === id);
	},

	// Carga favoritos desde localStorage al iniciar
	loadFromStorage: () => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			set({ favorites: JSON.parse(storedFavorites) });
		}
	},
});
