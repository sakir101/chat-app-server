import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { FormValidation } from './forms.validation'
import { FormController } from './forms.controller'

const router = express.Router()

router.post('/', validateRequest
    (FormValidation.createFormZodSchema),
    FormController.createForm
)

router.get('/', FormController.fetchAllForms)

router.get('/:id', FormController.getFormData)

router.patch('/:id', FormController.updateForm)

router.patch('/addField/:id', FormController.addField)

router.patch('/deleteField/:id', FormController.deleteField)

router.patch('/updateField/:id', FormController.updateField)

router.delete('/:id', FormController.deleteForm)

export const FormRoutes = router