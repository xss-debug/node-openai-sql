import { Request, Response, RequestHandler } from 'express';
import { Chats } from '../models/chats.model';
import { chatService } from '../services/chat.service';
import { logger } from '../utils/logger';

// Get list of chatgpt questions and answers
export const findList: RequestHandler = async (req: Request, res: Response) => {
  const results = await Chats.findAll();
  return res.render('index', { data: results });
}

// OpenAI API call service & create question and answer
export const create: RequestHandler = async (req: Request, res: Response) => {
  const question = req.body?.message;
  try {
     // Call OpenAI service
    const completion = await chatService.generateResponse(question);
    
    // Store the question and openAI response to db
    await Chats.create({ que: question, ans: completion?.choices[0].message.content });
    
    // Send it back to client
    return res.redirect('/history');
  } catch (error) {
    logger.error(error);
  }
}