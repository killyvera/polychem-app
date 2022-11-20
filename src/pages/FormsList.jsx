import React, { useContext, useEffect, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { DataStore } from "@aws-amplify/datastore";
import { Form } from "../models";
import { FormsContext } from "../contexts/FormsContext";

// Components
import SingleForm from "../components/SingleForm";

export const FormsList = () => {
  const { usersFormList, setUsersFormList } = useContext(FormsContext);
  const [isLoading, setIsLoading] = useState(true);

  const getForms = useCallback(async () => {
    try {
      const formsList = await DataStore.query(Form);
      setUsersFormList(formsList);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR FORMS LIST: ", error);
      setIsLoading(false);
    }
  }, [setUsersFormList]);

  useEffect(() => {
    getForms();
  }, [getForms]);

  const _renderForm = () => {
    if (isLoading) {
      return <Skeleton variant="rectangular" width="100%" height={108} />;
    } else if (usersFormList.length) {
      return usersFormList.map((usersForm) => (
        <SingleForm key={`user-form-${usersForm.id}`} data={usersForm} />
      ));
    } else {
      return (
        <Typography variant="p" fontWeight="bold" textAlign="center">
          Forms not found!
        </Typography>
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold">
        Formularios
      </Typography>
      <Stack marginTop={2} spacing={2}>
        {_renderForm()}
      </Stack>
    </Box>
  );
};
