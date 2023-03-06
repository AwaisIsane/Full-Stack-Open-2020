import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserList } from "../reducers/userListReducer";

const UsersView = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <span>Blogs Created</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersView;
