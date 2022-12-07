import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { styled } from "@mui/material/styles";
import { FormsContext } from "../../contexts/FormsContext";

// Components
import NavigationButton from "../NavigationButton";
import UserCard from "./UserCard";
import { useEffect } from "react";

const SearchEmployeeContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  flex: 1,
  marginLeft: theme.spacing(5),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(0),
  },
}));

export default function SearchEmployee({ qrResult, productId }) {
  const {
    usersProfile,
    setUsersProfile,
    selectedEmployees,
    updateSelectedEmployees,
  } = useContext(FormsContext);

  const [userName, updateUserName] = useState("");

  const handleSearchUsers = (ev) => {
    updateUserName(ev.target.value);
  };

  const handleUpdateUserTurn = (ev, userId) => {
    const updatedUsersProfile = [...usersProfile];
    const userIndex = updatedUsersProfile.findIndex(
      (user) => user.userId === userId
    );
    updatedUsersProfile[userIndex].userInfo[4].Value = ev.target.value;
    setUsersProfile(updatedUsersProfile);
  };

  const handleSelectEmployee = (user, isAlreadySelected) => {
    if (isAlreadySelected) {
      const updatedSelectedEmployee = [...selectedEmployees].filter(
        (s) => s.user.userId !== user.userId
      );
      updateSelectedEmployees(updatedSelectedEmployee);
    } else {
      updateSelectedEmployees([...selectedEmployees, { user, productId }]);
    }
  };

  const searchedUsers = [...usersProfile].filter((userProfile) => {
    const isSelected = !!selectedEmployees.find(
      (selectedEmployee) => selectedEmployee.user.userId === userProfile.userId
    );
    return (
      userProfile.userInfo[1].Value.toLowerCase().includes(
        userName.toLowerCase()
      ) && !isSelected
    );
  });

  useEffect(() => {
    updateUserName(qrResult);
  }, [qrResult]);

  return (
    <SearchEmployeeContainer>
      <Typography variant="h5" fontWeight="bold" color="#1976D2">
        Search Employee
      </Typography>
      <FormControl fullWidth variant="filled" sx={{ margin: "1.5rem 0" }}>
        <InputLabel htmlFor="lot-row-material-name">Enter Username</InputLabel>
        <FilledInput
          id="user-name"
          value={userName}
          name="name"
          onChange={handleSearchUsers}
        />
      </FormControl>
      <Box
        display="flex"
        flexWrap="wrap"
        // marginTop={selectedEmployee ? 1 : 0}
        marginBottom={2}
      >
        {selectedEmployees.map((selectedEmployee) => (
          <UserCard
            key={selectedEmployee.user.userId}
            userData={selectedEmployee.user}
            productId={productId}
            handleUpdateUserTurn={handleUpdateUserTurn}
            handleSelectEmployee={handleSelectEmployee}
          />
        ))}
        {userName &&
          searchedUsers.map((searchedUser) => (
            <UserCard
              key={searchedUser.userId}
              userData={searchedUser}
              productId={productId}
              handleUpdateUserTurn={handleUpdateUserTurn}
              handleSelectEmployee={handleSelectEmployee}
            />
          ))}
      </Box>
      <NavigationButton
        path={`/packaging/${productId}`}
        text="Ready to Production"
        disabled={!selectedEmployees.length}
      />
    </SearchEmployeeContainer>
  );
}
