import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { ButtonBox } from "../../../../styled/layout.styled";

type TProps = {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void
}

const ConfirmDelete = (props: TProps) => {
    const {open, onClose, onConfirm} = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography mb='2rem' color={'error'}>Do you really want to delete the user?</Typography>
        <ButtonBox>
        <Button variant="contained" color='error' onClick={onConfirm}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
        </ButtonBox>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
