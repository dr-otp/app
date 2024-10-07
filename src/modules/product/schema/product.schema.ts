import * as yup from 'yup'

export const productSchema = yup.object().shape({
  name: yup.string().required().min(3),
  price: yup
    .string()
    .required()
    .matches(/^\d+(\.\d{1,2})?$/, 'El precio debe ser un número válido')
    .test('is-positive', 'El precio debe ser mayor que 0', (value) => parseFloat(value) > 0)
})
