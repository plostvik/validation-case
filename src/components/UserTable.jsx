import { useSelector } from 'react-redux';

import styles from './UserTable.module.css';

const UserTable = () => {
  const user = useSelector(state => state.user);

  return (
    <table className={styles.table} border="1">
      <tbody>
        <tr>
          <th>First Name</th>
          <td>{user.firstName}</td>
        </tr>
        <tr>
          <th>Last Name</th>
          <td>{user.lastName}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{user.email}</td>
        </tr>
        <tr>
          <th>Message</th>
          <td>{user.message}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserTable;
