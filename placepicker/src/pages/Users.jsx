// import { useState } from "react";
import { Component } from "react";
import User from "../components/users/User.jsx";

// import classes from "./Users.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
  }

  toggleUsersHandler() {
    //this.state.showUsers = false; //NOT

    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul className="list-none m-0 p-0">
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className="my-8 mx-auto bg-white p-4 rounded-[12px] max-w-[40rem] text-center">
        <button
          onClick={this.toggleUsersHandler.bind(this)}
          className="font-inherit cursor-pointer bg-rose-900 text-rose border border-rose-900 rounded-xl py-3 px-8 hover:bg-rose-700 "
        >
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   // const usersList = (
//   //   <ul className="list-none m-0 p-0">
//   //     {DUMMY_USERS.map((user) => (
//   //       <User key={user.id} name={user.name} />
//   //     ))}
//   //   </ul>
//   // );

//   return (
//     <div className="my-8 mx-auto bg-white p-4 rounded-[12px] max-w-[40rem] text-center">
//       <button
//         onClick={toggleUsersHandler}
//         className="font-inherit cursor-pointer bg-rose-900 text-rose border border-rose-900 rounded-xl py-3 px-8 hover:bg-rose-700 "
//       >
//         {showUsers ? "Hide" : "Show"} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
