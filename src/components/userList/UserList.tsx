import { Button, Container, Grid } from "@mui/material";
import { useState } from "react";
import UserForm from "./components/userForm/UserForm";
import UserCard from "./components/userCard.tsx/UserCard";
import { useUserList } from "./useUserList";
import SearchFilter from "./components/searchFilter/SearchFIlter";

export const UserList = () => {
  const { userList, filter, handleEditFilter } = useUserList();
  const [popupOpen, setPopupOpen] = useState(false)
  const togglePopup = () => setPopupOpen(!popupOpen)
  
  return (
    <Container sx={{p: '7rem 0', width: '95%'}}>
        <SearchFilter inputData={filter} setInputData={handleEditFilter} />
      <Grid container spacing={3} mb='2rem'>
        {userList.map((user) => (
          <Grid item xs={12} sm={6} lg={4} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      <Button variant='outlined' onClick={togglePopup}>Add new user</Button>
      <UserForm open={popupOpen} onClose={togglePopup}/>
    </Container>
  );
};

export default UserList;
