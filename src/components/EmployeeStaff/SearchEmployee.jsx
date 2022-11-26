import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { FormsContext } from "../../contexts/FormsContext";

// Components
import NavigationButton from "../NavigationButton";
import UserCard from "./UserCard";
import { useEffect } from "react";

export default function SearchEmployee({ qrResult, productId }) {
  const { usersProfile, selectedEmployee, updateSelectedEmployee } =
    useContext(FormsContext);

  const [userName, updateUserName] = useState("");

  const handleSearchUsers = (ev) => {
    updateUserName(ev.target.value);
  };

  const handleSelectEmployee = (user, isAlreadySelected) => {
    if (isAlreadySelected) {
      updateSelectedEmployee(null);
    } else {
      updateSelectedEmployee(user);
    }
  };

  const searchedUsers = [...usersProfile].filter((userProfile) =>
    userProfile.userInfo[1].Value.toLowerCase().includes(userName.toLowerCase())
  );

  useEffect(() => {
    updateUserName(qrResult);
  }, [qrResult]);

  return (
    <Box flex={1} marginLeft="3rem" marginTop="2rem">
      <Typography variant="h5" fontWeight="bold" color="#1976D2">
        Search Employee
      </Typography>
      {!selectedEmployee && (
        <FormControl fullWidth variant="filled" sx={{ margin: "1.5rem 0" }}>
          <InputLabel htmlFor="lot-row-material-name">
            Enter Username
          </InputLabel>
          <FilledInput
            id="user-name"
            value={userName}
            name="name"
            onChange={handleSearchUsers}
          />
        </FormControl>
      )}
      <Box display="flex" flexWrap="wrap" marginBottom={2}>
        {selectedEmployee && (
          <UserCard
            key={selectedEmployee.userId}
            userData={selectedEmployee}
            handleSelectEmployee={handleSelectEmployee}
            selectedEmployee={selectedEmployee}
          />
        )}
        {!selectedEmployee &&
          userName &&
          searchedUsers.map((searchedUser) => (
            <UserCard
              key={searchedUser.userId}
              userData={searchedUser}
              handleSelectEmployee={handleSelectEmployee}
            />
          ))}
      </Box>
      <NavigationButton
        path={`/packaging/${productId}`}
        text="Ready to Production"
        disabled={!selectedEmployee}
      />
    </Box>
  );
}
