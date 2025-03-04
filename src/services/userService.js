import {db} from '../database';

const UserService = {
  createUser: (name, age) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Users (Name, Age) VALUES (?, ?)',
          [name, age],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Users',
          [],
          (_, result) => resolve(result.rows.raw()),
          (_, error) => reject(error),
        );
      });
    });
  },

  updateUser: (id, name, age) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Users SET Name = ?, Age = ? WHERE ID = ?',
          [name, age, id],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },

  deleteUser: id => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users WHERE ID = ?',
          [id],
          (_, result) => resolve(result),
          (_, error) => reject(error),
        );
      });
    });
  },
};

export default UserService;
