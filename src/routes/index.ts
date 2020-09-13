import { Router, Request, Response } from 'express';

import UserRouter from './user.router'

// Init router and path
const router = Router();

// Add sub-routes
router.get('/', (req: Request, res: Response)=>{
    res.json({
        status: 'success',
    })
});

router.use('/user', UserRouter)

// Export the base-router
export default router;
