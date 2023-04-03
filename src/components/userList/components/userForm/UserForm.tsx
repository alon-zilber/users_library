import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { IUserData } from "../../../../types/userData";
import { object, string } from "yup";
import { useAppDispatch } from "../../../../redux/store";
import { addNewUser, updateUserData } from "../../../../redux/user/userSlice";
import { v4 as uuidv4 } from "uuid";
import { ButtonBox } from "../../../../styled/layout.styled";

type TProps = {
  open: boolean;
  onClose: () => void;
  user?: IUserData;
};
const UserForm = (props: TProps) => {
  const { open, onClose, user } = props;

  const dispatch = useAppDispatch();

  const initialValues = {
    firstName: user?.name?.first || "",
    lastName: user?.name?.last || "",
    email: user?.email || "",
    country: user?.location.country || "",
    city: user?.location.city || "",
    street: user?.location.street || "",
  };

  const validationSchema = object({
    firstName: string().required().min(3),
    lastName: string().required().min(3),
    email: string().email().required(),
    country: string().required(),
    city: string().required(),
    street: string().required(),
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const newData = {
              ...user,
              id: user?.id || uuidv4(),
              name: {
                ...user?.name,
                first: values.firstName,
                last: values.lastName,
              },
              email: values.email,
              location: {
                country: values.country,
                city: values.city,
                street: values.street,
              },
            };

            if (user) {
              dispatch(updateUserData(newData));
            } else {
              dispatch(addNewUser(newData));
            }
            onClose();
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <>
                <Stack spacing={2} mb="2rem">
                  <Typography>Name:</Typography>

                  <TextField
                    label="First name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    error={!!errors?.firstName}
                    helperText={errors.firstName}
                  />
                  <TextField
                    label="Last name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    error={!!errors?.lastName}
                    helperText={errors.lastName}
                  />
                </Stack>
                <TextField
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  sx={{ mb: "2rem" }}
                  error={!!errors?.email}
                  helperText={errors.email}
                />
                <Stack spacing={2} mb="2rem">
                  <Typography>Location:</Typography>

                  <TextField
                    label="Country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    error={!!errors?.country}
                    helperText={errors.country}
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    error={!!errors?.city}
                    helperText={errors.city}
                  />
                  <TextField
                    label="Street"
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                    error={!!errors?.street}
                    helperText={errors.street}
                  />
                </Stack>
                <ButtonBox>
                <Button type="submit" variant="contained">
                  Save
                </Button>
                <Button onClick={onClose}>
                  Cancel
                </Button>
                </ButtonBox>
              </>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
