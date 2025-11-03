import type { StateCreator } from "zustand";
import AIService from "../services/AIService";

// Slice para manejar generación de recetas con IA
export type AISilce = {
	recipe: string; // Texto de la receta generada
	isGenerating: boolean; // Indica si la IA está generando contenido
	generateRecipe: (prompt: string) => Promise<void>; // Genera receta a partir de un prompt
};

// Implementación del slice
export const createAISlice: StateCreator<AISilce> = (set) => ({
	recipe: "", // Receta vacía al iniciar
	isGenerating: false, // No generando por defecto

	// Genera receta usando el servicio de IA
	generateRecipe: async (prompt: string) => {
		// Reinicia el estado y activa el indicador de carga
		set({ recipe: "", isGenerating: true });

		// Llama al servicio de IA
		const data = await AIService.generateRecipe(prompt);

		// Recibe la respuesta por partes y concatena el texto generado
		for await (const textPart of data) {
			set((state) => ({
				recipe: state.recipe + textPart,
			}));
		}

		// Finaliza la generación
		set({ isGenerating: false });
	},
});
