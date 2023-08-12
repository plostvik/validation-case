# Project Name

## Description

This project consists of a user data collection form, gathering information such as the first name, last name, email, and a message from the user. The form includes validation to ensure that the data is correct. Once the user presses the submit button, and if validation is successful, the new data is stored in a Redux store.

After submitting the new data to the store, a table is updated to visually represent that the data has been collected. Unit tests are also included within the project, ensuring that the form's functionality and its connection with the store operate correctly.

## Installation and Running Locally

Follow these instructions to get the project up and running on your local machine:

1. **Install required dependencies:**
   ```bash
   npm install
   ```
2. **Run the application:**
   ```bash
   npm start
   ```

## Packages Used

The application uses several npm packages to streamline its operations:

- **redux** For managing the application's state.
- **react-redux** For connecting React components to the Redux store.
- **validator** For validation of form inputs.

## Testing

To run the unit tests for the form and its connection with the store, execute the following command:

```bash
   npm test
```
