import { useAppStore } from "../stores/useAppStore";

// Pagina de generar recetas con IA
export default function GenerateAI() {
	// Obtener estado de notificación
	const showNotification = useAppStore((state) => state.showNotification);

	// Obtener funcion de generacion de receta
	const generateRecipe = useAppStore((state) => state.generateRecipe);

	// Obtener estado de receta
	const recipe = useAppStore((state) => state.recipe);

	// Obtener estado de generacion de receta
	const isGenerating = useAppStore((state) => state.isGenerating);

	// Manejar envio del formulario
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Obtenemos los datos del formulario
		const form = new FormData(e.currentTarget);

		// Extraemos el campo prompt del formulario
		const prompt = form.get("prompt") as string;

		if (prompt.trim() === "") {
			showNotification({ text: "La busqueda no puede ir vacia", error: true });
			return;
		}

		// Generamos la receta
		await generateRecipe(prompt);
	};

	return (
		<>
			<h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>

			<div className="max-w-4xl mx-auto">
				<form onSubmit={handleSubmit} className="flex flex-col space-y-3 py-10">
					<div className="relative">
						<input
							name="prompt"
							id="prompt"
							className="border bg-white p-4 rounded-lg w-full border-slate-800"
							placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
						/>
						<button
							type="submit"
							aria-label="Enviar"
							className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${
								isGenerating ? "cursor-not-allowed opacity-50" : ""
							}`}
							disabled={isGenerating}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-10 h-10"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</button>
					</div>
				</form>
				{isGenerating && <p className="font-bold text-xl ">Generando...</p>}
				<div className="py-10 whitespace-pre-wrap">{recipe}</div>
			</div>
		</>
	);
}
