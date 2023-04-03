import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)`
height: 100%;
    .MuiCardHeader-subheader{
        word-break: break-all;
    }

  &:hover {
    box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  }
`;
