import { Router, Request, Response } from 'express';

// Init router and path
const router = Router();

// Add sub-routes
router.get('/', (req: Request, res: Response)=>{
    res.json({
        status: 'success',
    })
});

// Export the base-router
export default router;
