import { Router } from 'express';
import { validate } from '@src/common/utils/validate.utils';

const router = Router();

// controller
import { categoryController } from '@src/category/';
//dtos
import { CategoryDto } from '@src/category/dtos/category.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@src/category/dtos/search.dto';
import { UpdateCategoryDto } from '@src/category/dtos/updateCategory.dto';
//validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.get('/', validateBody(SearchDto), categoryController.find);
router.get('/:id', validateParams(ParamsDto), categoryController.findOne);
//router.delete
//router.patch
router.post('/', validateBody(CategoryDto), categoryController.create);

export default router;
