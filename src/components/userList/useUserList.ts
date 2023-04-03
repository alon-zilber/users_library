import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/user/userThunk";
import { IFilterData, IUserData } from "../../types/userData";

const defaultFilterInputData = {
  id: "",
  name: "",
  email: "",
  location: "",
};

export const useUserList = () => {
  const userList = useSelector((state: AppState) => state.user);
  const [filter, setFilter] = useState<IFilterData>(defaultFilterInputData);

  const handleEditFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value.toLowerCase() });
  };

  const getFullUserName = (user: IUserData) => {
    return `${user.name.title} ${user.name.first} ${user.name.last}`;
  };

  const getFullUserAddress = (user: IUserData) => {
    return `${user.location.country} ${user.location.city} ${user.location.street}`;
  };

  const filteredUserData = userList.filter(
    (user) =>
      user.id.includes(filter.id) &&
      getFullUserName(user).toLowerCase().includes(filter.name) &&
      user.email.includes(filter.email) && 
      getFullUserAddress(user).toLowerCase().includes(filter.location)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userList.length) {
      dispatch(fetchUsers());
    }
  }, []);

  return { userList: filteredUserData, filter, handleEditFilter };
};
