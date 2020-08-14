import React, { useState, useEffect } from "react";
import { getUsers } from "api/usersApi";
import UserListItem from "modules/UserListItem";

function Users() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get orders
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  /* Filter by search */
  let filteredUsers = users;
  filteredUsers = filteredUsers.filter((eachItem) => {
    return (
      eachItem["name"].toLowerCase().includes(searchText.toLowerCase()) ||
      eachItem["username"].toLowerCase().includes(searchText.toLowerCase()) ||
      eachItem["email"].toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Usuarios</h1>
            <p className="email-content-subtitle">
              Mostrando {filteredUsers.length} de {users.length} usuarios en el
              sistema
            </p>
          </div>

          <div className="email-content-controls pure-u-1-2">
            <input
              className="pure-input-1"
              type="text"
              placeholder="Buscar usuario"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="email-content-body product-cards-container">
          {filteredUsers.map((user) => {
            return <UserListItem key={user.id} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Users;
