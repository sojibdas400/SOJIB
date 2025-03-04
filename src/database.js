import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => console.error(error)
);

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS '
      + 'Users '
      + '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);'
    );
  });
};

const initializeDB = () => {
  createTable();
};

export { db, initializeDB };