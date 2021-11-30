import { Input, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-relay';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';

import { VStack, Button } from '@fakeddit/ui';

import { useAuth } from '../auth/useAuth';

import { UserRegister } from './UserRegisterMutation';
import type { UserRegisterMutation } from './__generated__/UserRegisterMutation.graphql';

const initialValues = {
  username: '',
  email: '',
  password: '',
};

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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <VStack alignSelf="center" spacing="12px">
            <Field name="email">
              {({ field }: FieldProps) => (
                <Input {...field} type="email" placeholder="Email" />
              )}
            </Field>
            <Field name="username">
              {({ field }: FieldProps) => (
                <Input {...field} placeholder="Username" />
              )}
            </Field>
            <Field name="password">
              {({ field }: FieldProps) => (
                <Input {...field} type="password" placeholder="Password" />
              )}
            </Field>
            <Button width="100%" textTransform="uppercase" type="submit">
              {isSubmitting ? <Spinner /> : 'Sign up'}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};
