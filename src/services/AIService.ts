import { openRouter } from "../lib/ai";
import { streamText } from "ai";

export default {
    async generateRecipe(prompt: string) {
        const result = await streamText({
            model: openRouter.chat("meta-llama/llama-3.3-8b-instruct:free"),
            prompt
        });

        return result.textStream;

    }
    
}