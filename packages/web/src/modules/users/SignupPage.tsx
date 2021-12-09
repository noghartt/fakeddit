import { useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-relay';
import { FormikProvider, Form, useFormik } from 'formik';
import * as Yup from 'yup';

import { VStack, Button, ErrorText } from '@fakeddit/ui';

import { InputField } from '@/shared-components/InputField';

import { useAuth } from '../auth/useAuth';

import { UserRegister } from './UserRegisterMutation';
import type { UserRegisterMutation } from './__generated__/UserRegisterMutation.graphql';

export const SignupPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [handleUserRegister] = useMutation<UserRegisterMutation>(UserRegister);

  const formikValue = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    isInitialValid: false,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
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
      handleUserRegister({
        variables: values,
        onCompleted: ({ userRegisterMutation }, error) => {
          actions.resetForm();

          if (error && error.length > 0) {
            setError({ status: true, message: error[0].message });
            return;
          }

          signin(userRegisterMutation?.token, () => {
            navigate('/feed', { replace: true });
          });
        },
      });
    },
  });

  const { isSubmitting, isValid } = formikValue;

  return (
    <FormikProvider value={formikValue}>
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
        {error.status && <ErrorText>{error.message}</ErrorText>}
      </Form>
    </FormikProvider>
  );
};
