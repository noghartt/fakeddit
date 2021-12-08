import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-relay';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { VStack, Button } from '@fakeddit/ui';

import { InputField } from '@/shared-components/InputField';

import { useAuth } from '../auth/useAuth';

import { UserRegister } from './UserRegisterMutation';
import type { UserRegisterMutation } from './__generated__/UserRegisterMutation.graphql';

const initialValues = {
  username: '',
  email: '',
  password: '',
};

const signupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string()
    .min(3, 'The username needs at least 3 characters')
    .max(25)
    .required('Username is required'),
  // TODO: The rules to write a safe password need to be improved adding some
  password: Yup.string()
    .min(8, 'The password needs at least 8 characters')
    .required('Password is required'),
});

type InitialValues = typeof initialValues;
type formikSubmitFn<T> = (values: T, formikHelpers: FormikHelpers<T>) => void;

export const SignupPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [handleUserRegister] = useMutation<UserRegisterMutation>(UserRegister);

  const handleSubmit: formikSubmitFn<InitialValues> = (values, actions) => {
    handleUserRegister({
      variables: values,
      onCompleted: ({ userRegisterMutation }) => {
        // TODO: Instead of it, could I resume this functions on actions.resetForm?
        actions.setValues(initialValues);
        actions.setSubmitting(false);

        signin(userRegisterMutation?.token, () => {
          navigate('/feed', { replace: true });
        });
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <VStack alignSelf="center" spacing="12px">
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              shouldValidate
            />
            <InputField name="username" placeholder="Username" shouldValidate />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              shouldValidate
            />
            <Button width="100%" type="submit" disabled={!isValid}>
              {isSubmitting ? <Spinner /> : 'Sign up'}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};
