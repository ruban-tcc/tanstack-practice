
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import SearchUsers from './components/SearchUsers';

function App() {
  return (
    <div>
      <h1>User Management System</h1>

      <AddUser />

      <hr />

      <SearchUsers />

      <hr />

      <UserList />
    </div>
  );
}

export default App;
