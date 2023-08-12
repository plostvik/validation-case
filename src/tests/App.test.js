import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import UserForm from 'components/UserForm';
import UserTable from 'components/UserTable';
import { Provider } from 'react-redux';
import store from 'store/store.js';
import userReducer from '../store/reducer';

const TestingForm = (
  <Provider store={store}>
    <UserForm />
  </Provider>
);

const TestingTable = (
  <Provider store={store}>
    <UserTable />
  </Provider>
);

test('all fields should be validated after user click submit button', () => {
  render(TestingForm);

  fireEvent.click(screen.getByText('Submit'));

  expect(screen.getByText('First name is required')).toBeInTheDocument();
  expect(screen.getByText('Last name is required')).toBeInTheDocument();
  expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
  expect(screen.getByText('Message must be at least 10 characters long')).toBeInTheDocument();
});

test('first and last name should be required', () => {
  render(TestingForm);

  fireEvent.click(screen.getByText('Submit'));

  expect(screen.getByText('First name is required')).toBeInTheDocument();
  expect(screen.getByText('Last name is required')).toBeInTheDocument();
});

test('email should be valid', () => {
  render(TestingForm);
  fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'not a valid email' } });
  fireEvent.click(screen.getByText('Submit'));
  expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
});

test('message should be at least 10 characters long', () => {
  render(TestingForm);
  fireEvent.change(screen.getByLabelText('Message:'), { target: { value: 'Short' } });
  fireEvent.click(screen.getByText('Submit'));
  expect(screen.getByText('Message must be at least 10 characters long')).toBeInTheDocument();
});

test('form should be submitted when all fields are valid and new data from the store should be rendered', () => {
  window.alert = jest.fn();

  render(TestingForm);
  fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByLabelText('Message:'), { target: { value: 'A valid message here.' } });
  fireEvent.click(screen.getByText('Submit'));

  expect(window.alert).toHaveBeenCalledWith('Info has been submitted to the store!');

  cleanup();
  render(TestingTable);

  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Doe')).toBeInTheDocument();
  expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  expect(screen.getByText('A valid message here.')).toBeInTheDocument();
});

test('testing SET_USER_INFO action', () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };
  const newUserData = {};

  newUserData.firstName = 'John';
  newUserData.lastName = 'Doe';

  const action = { type: 'SET_USER_INFO', payload: newUserData };

  const newState = userReducer(initialState, action);

  expect(newState.firstName).toEqual(newUserData.firstName);
  expect(newState.lastName).toEqual(newUserData.lastName);
  expect(newState.email).toEqual(initialState.email);
  expect(newState.message).toEqual(initialState.message);
});
