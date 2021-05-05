import React from "react";
import { Avatar, Dropdown } from "neetoui";
import { NavLink } from "react-router-dom";
import { useUserState } from "contexts/user";

export default function UserDropDown() {
  const { user } = useUserState();
  const contact = user
    ? { name: `${user.first_name} ${user.last_name}` }
    : null;
  return (
    <Dropdown
      position="bottom"
      customTarget={() => (
        <Avatar className="cursor-pointer" size={40} contact={contact} />
      )}
      closeOnSelect
    >
      <div>
        <NavLink
          to="/my/profile"
          className="w-full nui-dropdown--item"
          activeClassName="active"
        >
          <span>My profile</span>
        </NavLink>
        <div className="w-full nui-dropdown--item">Logout</div>
      </div>
    </Dropdown>
  );
}
