import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { deleteUser } from "../../../../redux/user/userSlice";
import { IUserData } from "../../../../types/userData";
import UserForm from "../userForm/UserForm";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { StyledCard } from "./UserCard.styled";

type TProps = {
  user: IUserData;
};

type TPopup = "edit" | "delete" | null;
const UserCard = ({ user }: TProps) => {
  const [popupOpen, setPopupOpen] = useState<TPopup>(null);
  const closePopup = () => setPopupOpen(null);
  const dispatch = useAppDispatch();

  const confirmDelete = () => {
    dispatch(deleteUser(user.id))
    closePopup()
  }

  return (
    <StyledCard>
      <CardHeader
        avatar={<Avatar src={user.picture}>{user.name.first[0]}</Avatar>}
        title={`${user.name.title} ${user.name.first} ${user.name.last}`}
        subheader={user.email}
        action={
          <IconButton onClick={() => setPopupOpen("edit")}>
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
        {Object.entries(user.location).map(([field, value]) => (
          <Stack key={field}>
            <Typography variant="body2">
              {field}: <b>{value}</b>
            </Typography>
          </Stack>
        ))}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton   onClick={() => setPopupOpen('delete')}>
          <Delete />
        </IconButton>
      </CardActions>
      <UserForm open={popupOpen === "edit"} onClose={closePopup} user={user} />
      <ConfirmDelete open={popupOpen === "delete"} onClose={closePopup} onConfirm={confirmDelete}/>
    </StyledCard>
  );
};

export default UserCard;
