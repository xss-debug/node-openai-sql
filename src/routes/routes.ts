import { Request, Response, Router } from 'express';
import { findList, create } from '../controllers/chat.controller';

const router = Router();


router.get('/', async (req: Request, res: Response) => {
    res.redirect('/history');
});

// Get the list of chat history
router.get('/history', findList);

// Express route for chatbot interaction
router.post('/chatbot', create);


export default router;