import * as yup from 'yup'

export const customerSchema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required()
})
