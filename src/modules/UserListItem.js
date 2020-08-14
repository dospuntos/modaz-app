import React from "react";
import { Link } from "react-router-dom";
import { TiUser } from "react-icons/ti";

function UserListItem({ user }) {
  return (
    <div className="pure-g order-list-item">
      <div className="pure-u-2-24 icon">
        <TiUser size={32} />
      </div>
      <div className="pure-u-8-24">
        <Link to={"users/" + user.id}>
          {user.name} ({user.id})
        </Link>
      </div>
      <div className="pure-u-4-24">{user.username}</div>
      <div className="pure-u-4-24">{user.email}</div>
    </div>
  );
}

export default UserListItem;
