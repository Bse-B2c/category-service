import { Router } from 'express';
import category from '@src/routes/api/category';

const router = Router();

router.use('/', category);

export default router;
