
import UserList from './components/UserList';
import AddUser from './components/AddUser';

function App() {
  return (
    <div>
      <h1>User Management System</h1>

      <AddUser />

      <hr />

      <UserList />
    </div>
  );
}

export default App;
