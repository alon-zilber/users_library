import { Grid, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { IFilterData } from "../../../../types/userData";

type TProps = {
  inputData: IFilterData;
  setInputData: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const SearchFilter = ({ inputData, setInputData }: TProps) => {
  return (
    <Stack>
      <Typography variant='h6' mb='1rem'>Search Filter</Typography>
      <Grid container spacing={2} mb='2rem'>
        {Object.entries(inputData).map(([key, value]) => (
        <Grid item xs={12} sm={6} md={3} key={key}>
          <TextField
            label={key}
            name={key}
            value={value}
            onChange={setInputData}
            sx={{width: '100%'}}
          />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default SearchFilter;
