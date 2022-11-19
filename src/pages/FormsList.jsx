import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { FormsContext } from "../contexts/FormsContext";

// Components
import SingleForm from "../components/SingleForm";

export const FormsList = () => {
  const { usersFormList } = useContext(FormsContext);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold">
        Formularios
      </Typography>
      <Stack marginTop={2} spacing={2}>
        {usersFormList.map((usersForm) => (
          <SingleForm key={`user-form-${usersForm.id}`} data={usersForm} />
        ))}
      </Stack>
    </Box>
  );
};
