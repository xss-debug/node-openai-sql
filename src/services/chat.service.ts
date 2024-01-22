import { OpenAI } from 'openai';
import 'dotenv/config';
import { logger } from '../utils/logger';

// OpenAI API key
const openAI = new OpenAI({ apiKey: process.env['OPEN_AI_KEY'] });

// Service for chatbot interaction
class ChatService {
    constructor() { };

    isHealthCareQuestion(question: string) {
        const health_care_keyword = ['health', 'medical', 'doctor', 'disease', 'treatment'];
        const lowerCaseQues = question?.toLowerCase();
        return health_care_keyword.some(key => lowerCaseQues.includes(key));
    }

    // Call OpenAI API
    async generateResponse(ques: string) {
        try {
            const res = await openAI.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: 'user', content: ques }],
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                max_tokens: 50
            });
            return res;
        } catch (err) {
            logger.error(err);
        }
    }
}

export const chatService = new ChatService();

