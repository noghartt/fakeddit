import { useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';

import { VStack, Button, ErrorText } from '@fakeddit/ui';

import { InputField } from '@/shared-components/InputField';

import { useAuth } from '../auth/useAuth';

import { UserLogin } from './UserLoginMutation';
import type { UserLoginMutation } from './__generated__/UserLoginMutation.graphql';

export const LoginPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [handleUserLogin] = useMutation<UserLoginMutation>(UserLogin);

  const formikValue = useFormik({
    initialValues: { username: '', password: '' },
    isInitialValid: false,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, 'The username needs at least 3 characters')
        .max(25)
        .required('Username is required'),
      // TODO: The rules to write a safe password need to be improved adding some
      password: Yup.string()
        .min(8, 'The password needs at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: (values, actions) => {
      handleUserLogin({
        variables: values,
        onCompleted: ({ userLoginMutation }, error) => {
          actions.resetForm();

          if (error && error.length > 0) {
            setError({ status: true, message: error[0].message });
            return;
          }

          signin(userLoginMutation?.token, () => {
            navigate('/feed', { replace: true });
          });
        },
      });
    },
  });

  const { isValid, isSubmitting } = formikValue;

  return (
    <FormikProvider value={formikValue}>
      <Form>
        <VStack alignSelf="center" spacing="12px">
          <InputField name="username" placeholder="Username" shouldValidate />
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            shouldValidate
          />
          <Button type="submit" disabled={!isValid}>
            {isSubmitting ? <Spinner /> : 'Log in'}
          </Button>
          {error.status && <ErrorText>{error.message}</ErrorText>}
        </VStack>
      </Form>
    </FormikProvider>
  );
};
