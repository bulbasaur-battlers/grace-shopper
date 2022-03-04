import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/adminUsers";

function AdminUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  let users = useSelector((state) => state.adminUsers);

  if (users.length === 0) {
    return <h1>No Users Currently!</h1>;
  } else {
    return (
      <div>
        <h3>Users</h3>
        <div className="allUsers">
          {users.map((user) => {
            return (
              <div className="singleUser" key={user.id}>
                <div>
                  <h1>{user.username}</h1>
                </div>
                <div className="userInfo">
                  <div>
                    <p>Password: {user.password}</p>
                    <p>Email: {user.email}</p>
                    <p>
                      User Status:{" "}
                      {user.isAdmin === true ? "Admin" : "Customer"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AdminUsers;
