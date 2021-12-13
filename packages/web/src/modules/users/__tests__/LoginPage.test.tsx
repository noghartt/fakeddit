import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

import { WithProviders } from '@/../test/WithProviders';
import { TestRouter } from '@/../test/TestRouter';

import { Routes } from '@/Routes';

afterEach(cleanup);

it('should navigate to /feed after login correctly the user', async () => {
  const environment = createMockEnvironment();
  const history = createMemoryHistory();

  render(
    <TestRouter history={history}>
      <WithProviders relayEnvironment={environment}>
        <Routes />
      </WithProviders>
    </TestRouter>,
  );

  const variables = {
    username: 'johndoe',
    password: 'thisisanawkwardbutcorrectlypassword',
  };

  await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

  userEvent.type(screen.getByPlaceholderText('Username'), variables.username);
  userEvent.type(screen.getByPlaceholderText('Password'), variables.password);

  await waitFor(() => expect(screen.getByRole('button')).toBeEnabled());

  userEvent.click(screen.getByRole('button'));

  expect(history.location.pathname).toBe('/');

  await waitFor(() => {
    const operation = environment.mock.getMostRecentOperation();

    expect(operation.request.variables).toMatchObject(variables);

    environment.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation),
    );
  });

  expect(history.location.pathname).toBe('/feed');
});

it('should display an error and disable the button when type in username input', async () => {
  render(
    <MemoryRouter>
      <WithProviders>
        <Routes />
      </WithProviders>
    </MemoryRouter>,
  );

  await waitFor(() => screen.getByRole('button'));
  expect(screen.getByRole('button')).toBeDisabled();

  const usernameInput = screen.getByPlaceholderText('Username');

  userEvent.click(usernameInput);
  await waitFor(() => usernameInput.blur());

  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('error-message-username')).toHaveTextContent(
    'Username is required',
  );

  userEvent.type(usernameInput, 'ab');
  await waitFor(() => usernameInput.blur());

  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('error-message-username')).toHaveTextContent(
    'The username needs at least 3 characters',
  );

  userEvent.type(usernameInput, 'someawkwardvaluethatisbiggerthanusual');
  await waitFor(() => usernameInput.blur());

  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('error-message-username')).toHaveTextContent(
    'username must be at most 25 characters',
  );
});

it('should display an error and disable the button when type in password input', async () => {
  render(
    <MemoryRouter>
      <WithProviders>
        <Routes />
      </WithProviders>
    </MemoryRouter>,
  );

  await waitFor(() => screen.getByRole('button'));
  expect(screen.getByRole('button')).toBeDisabled();

  const passwordInput = screen.getByPlaceholderText('Password');

  userEvent.click(passwordInput);
  await waitFor(() => passwordInput.blur());

  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('error-message-password')).toHaveTextContent(
    'Password is required',
  );

  userEvent.type(passwordInput, 'ab');
  await waitFor(() => passwordInput.blur());

  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('error-message-password')).toHaveTextContent(
    'The password needs at least 8 characters',
  );
});

it('should display an general error on the form if return error from the mutation', async () => {
  const environment = createMockEnvironment();

  render(
    <MemoryRouter>
      <WithProviders relayEnvironment={environment}>
        <Routes />
      </WithProviders>
    </MemoryRouter>,
  );

  expect(await screen.findByRole('button')).toBeDisabled();

  await waitFor(() => screen.getByRole('button'));
  expect(screen.getByRole('button')).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText('Username'), 'johndoe');
  userEvent.type(
    screen.getByPlaceholderText('Password'),
    'thisisanawkwardpassword',
  );

  expect(await screen.findByRole('button')).toBeEnabled();

  userEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    const operation = environment.mock.getMostRecentOperation();

    environment.mock.resolve(operation, {
      data: {
        userLoginMutation: null,
      },
      errors: [
        {
          message: 'Some error message from backend',
        },
      ],
    });
  });

  // TODO: I think that it could be improved adding getBy based on ARIA maybe.
  expect(screen.getByTestId('form-error-text')).toHaveTextContent(
    'Some error message from backend',
  );
});
