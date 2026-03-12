import { Fragment, Component } from "react";

import UsersList from "../users/UsersList";
import UsersContext from "../users/users-context";

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }
  componentDidMount() {
    // Send http request...
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm),
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div>
          <input
            type="search"
            onChange={this.searchChangeHandler.bind(this)}
            className="bg-rose-900 text-rose border border-rose-900 rounded-xl py-3 px-8 "
          />
        </div>
        <UsersList users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

export default UserFinder;
