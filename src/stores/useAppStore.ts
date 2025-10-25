import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, type RecipesSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";
import { createAISlice, type AISilce } from "./aiSlice";

export const useAppStore = create<
	RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISilce
>()(devtools((...a) => ({
	...createRecipesSlice(...a),
	...createFavoritesSlice(...a),
	...createNotificationSlice(...a),
	...createAISlice(...a),
})));
