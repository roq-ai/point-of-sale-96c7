import * as yup from 'yup';

export const storeManagerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  business_id: yup.string().nullable(),
});
