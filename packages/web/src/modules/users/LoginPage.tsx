import { Spinner } from '@chakra-ui/react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { VStack, Button } from '@fakeddit/ui';

import { InputField } from '@/shared-components/InputField';

import { useAuth } from '../auth/useAuth';

import { UserLogin } from './UserLoginMutation';
import type { UserLoginMutation } from './__generated__/UserLoginMutation.graphql';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'The username needs at least 3 characters')
    .max(25)
    .required('Username is required'),
  // TODO: The rules to write a safe password need to be improved adding some
  password: Yup.string()
    .min(8, 'The password needs at least 8 characters')
    .required('Password is required'),
});

const initialValues = { username: '', password: '' };

type formikSubmitFn<T> = (values: T, formikHelpers: FormikHelpers<T>) => void;

export const LoginPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [handleUserLogin] = useMutation<UserLoginMutation>(UserLogin);

  const handleSubmit: formikSubmitFn<typeof initialValues> = (
    values,
    actions,
  ) => {
    handleUserLogin({
      variables: values,
      onCompleted: ({ userLoginMutation }) => {
        actions.setValues(initialValues);
        actions.setSubmitting(false);

        signin(userLoginMutation?.token, () => {
          navigate('/feed', { replace: true });
        });
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <VStack alignSelf="center" spacing="12px">
            <InputField name="username" placeholder="Username" />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button width="100%" type="submit" disabled={!isValid}>
              {isSubmitting ? <Spinner /> : 'Log in'}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};
