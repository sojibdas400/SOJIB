import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import UserService from './src/services/userService';
import {initializeDB} from './src/database';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);

  useEffect(() => {
    initializeDB();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load users');
    }
  };

  const handleSubmit = async () => {
    if (!name || !age) return;

    try {
      if (selectedId) {
        await UserService.updateUser(selectedId, name, age);
      } else {
        await UserService.createUser(name, age);
      }
      setName('');
      setAge('');
      setSelectedId(null);
      await loadUsers();
    } catch (error) {
      Alert.alert('Error', 'Operation failed');
    }
  };

  const handleDelete = async id => {
    try {
      await UserService.deleteUser(id);
      await loadUsers();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const handleEdit = user => {
    setName(user.Name);
    setAge(user.Age.toString());
    setSelectedId(user.ID);
  };

  return (
    <View style={{padding: 20}}>
      <View style={styles.buttonRow}>
        <Button title="Show App.js" onPress={() => setSelectedCode('app')} />
        <Button
          title="Show Database.js"
          onPress={() => setSelectedCode('database')}
        />
        <Button
          title="Show UserService"
          onPress={() => setSelectedCode('service')}
        />
      </View>

      {/* Existing UI elements for CRUD operations */}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title={selectedId ? 'Update User' : 'Add User'}
        onPress={handleSubmit}
      />

      <FlatList
        data={users}
        keyExtractor={item => item.ID.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text>
              {item.Name} ({item.Age})
            </Text>
            <View style={styles.itemButtons}>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => handleDelete(item.ID)} />
            </View>
          </View>
        )}
      />

      <Modal
        visible={!!selectedCode}
        animationType="slide"
        onRequestClose={() => setSelectedCode(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedCode(null)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.codeContainer}>
            <Text style={styles.codeText}>
              {selectedCode === 'app'
                ? appCode
                : selectedCode === 'database'
                ? databaseCode
                : userServiceCode}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  codeContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  itemButtons: {
    flexDirection: 'row',
    gap: 10,
  },
});

const appCode = `// App.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import UserService from './src/services/userService';
import {initializeDB} from './src/database';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);

  useEffect(() => {
    initializeDB();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load users');
    }
  };

  const handleSubmit = async () => {
    if (!name || !age) return;

    try {
      if (selectedId) {
        await UserService.updateUser(selectedId, name, age);
      } else {
        await UserService.createUser(name, age);
      }
      setName('');
      setAge('');
      setSelectedId(null);
      await loadUsers();
    } catch (error) {
      Alert.alert('Error', 'Operation failed');
    }
  };

  const handleDelete = async id => {
    try {
      await UserService.deleteUser(id);
      await loadUsers();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const handleEdit = user => {
    setName(user.Name);
    setAge(user.Age.toString());
    setSelectedId(user.ID);
  };

  return (
    <View style={{padding: 20}}>
      <View style={styles.buttonRow}>
        <Button title="Show App.js" onPress={() => setSelectedCode('app')} />
        <Button
          title="Show Database.js"
          onPress={() => setSelectedCode('database')}
        />
        <Button
          title="Show UserService"
          onPress={() => setSelectedCode('service')}
        />
      </View>

      {/* Existing UI elements for CRUD operations */}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title={selectedId ? 'Update User' : 'Add User'}
        onPress={handleSubmit}
      />

      <FlatList
        data={users}
        keyExtractor={item => item.ID.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text>
              {item.Name} ({item.Age})
            </Text>
            <View style={styles.itemButtons}>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => handleDelete(item.ID)} />
            </View>
          </View>
        )}
      />

      <Modal
        visible={!!selectedCode}
        animationType="slide"
        onRequestClose={() => setSelectedCode(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedCode(null)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.codeContainer}>
            <Text style={styles.codeText}>
              {selectedCode === 'app'
                ? appCode
                : selectedCode === 'database'
                ? databaseCode
                : userServiceCode}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  codeContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  itemButtons: {
    flexDirection: 'row',
    gap: 10,
  },
});
`;

const databaseCode = `// database.js
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
      'CREATE TABLE IF NOT EXISTS ' +
      'Users ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);'
    );
  });
};

const initializeDB = () => {
  createTable();
};

export { db, initializeDB };`;

const userServiceCode = `// userService.js
import { db } from './database';

const UserService = {
  createUser: (name, age) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Users (Name, Age) VALUES (?, ?)',
          [name, age],
          (_, result) => resolve(result),
          (_, error) => reject(error)
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
          (_, error) => reject(error)
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
          (_, error) => reject(error)
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
          (_, error) => reject(error)
        );
      });
    });
  },
};

export default UserService;`;
