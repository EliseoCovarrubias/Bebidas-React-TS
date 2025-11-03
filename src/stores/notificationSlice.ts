import type { StateCreator } from "zustand";
import type { FavoritesSliceType } from "./favoritesSlice";

// Tipo de notificación
type Notification = {
	text: string; // Mensaje a mostrar
	error: boolean; // Indica si es error o éxito
	show: boolean; // Control de visibilidad
};

// Slice de notificaciones
export type NotificationSliceType = {
	notification: Notification; // Estado actual de la notificación
	showNotification: (payload: Pick<Notification, "text" | "error">) => void; // Muestra una notificación
	hideNotification: () => void; // Oculta la notificación
};

// Implementación del slice
export const createNotificationSlice: StateCreator<
	NotificationSliceType & FavoritesSliceType,
	[],
	[],
	NotificationSliceType
> = (set, get) => ({
	// Estado inicial
	notification: {
		text: "",
		error: false,
		show: false,
	},

	// Mostrar notificación
	showNotification: (payload) => {
		set({
			notification: {
				text: payload.text,
				error: payload.error,
				show: true,
			},
		});

		// Ocultar automáticamente después de 3 segundos
		setTimeout(() => {
			get().hideNotification();
		}, 3000);
	},

	// Ocultar notificación y reiniciar valores
	hideNotification: () => {
		set({
			notification: {
				text: "",
				error: false,
				show: false,
			},
		});
	},
});
