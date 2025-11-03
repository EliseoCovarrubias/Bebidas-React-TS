import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, type RecipesSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";
import { createAISlice, type AISilce } from "./aiSlice";

// Store global combinando todos los slices
export const useAppStore = create<
	RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISilce
>()(
	devtools((...a) => ({
		// Estado y acciones para recetas
		...createRecipesSlice(...a),
		// Estado y acciones para favoritos
		...createFavoritesSlice(...a),
		// Estado y acciones para notificaciones
		...createNotificationSlice(...a),
		// Estado y acciones de IA
		...createAISlice(...a),
	}))
);
