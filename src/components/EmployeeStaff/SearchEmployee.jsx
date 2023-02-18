import { useContext, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { styled } from "@mui/material/styles";
import { FormsContext } from "../../contexts/FormsContext";
import { DataStore } from "@aws-amplify/datastore";
import { TeamMember } from "../../models";

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

export default function SearchEmployee({ qrResult, setQRResult, productionId }) {
  const {
    usersProfile,
    setUsersProfile,
    selectedEmployees,
    updateSelectedEmployees,
  } = useContext(FormsContext);

  const [userName, updateUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchUsers = (ev) => {
    updateUserName(ev.target.value);
    setQRResult(ev.target.value);
  };

  const handleUpdateUserTurn = async (ev, userId, teamMemberId) => {
    const updatedUsersProfile = [...usersProfile];
    const userIndex = updatedUsersProfile.findIndex(
      (user) => user.userId === userId
    );
    if (teamMemberId) {
      try {
        const original = await DataStore.query(TeamMember, teamMemberId);
        await DataStore.save(
          TeamMember.copyOf(original, (updated) => {
            updated.shift = ev.target.value;
          })
        );
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    updatedUsersProfile[userIndex].userInfo[4].Value = ev.target.value;
    setUsersProfile(updatedUsersProfile);
  };

  const handleSelectEmployee = async (user, isAlreadySelected) => {
    if (isAlreadySelected) {
      const updatedSelectedEmployee = [...selectedEmployees].filter(
        (s) => s.user.userId !== user.userId
      );
      await DataStore.delete(TeamMember, user.teamMemberId);
      updateSelectedEmployees(updatedSelectedEmployee);
    } else {
      try {
        const teamMember = await DataStore.save(
          new TeamMember({
            cognitoId: user.userId,
            productionID: productionId,
            shift: user.userInfo[4].Value,
          })
        );
        updateSelectedEmployees([
          ...selectedEmployees,
          { user, productionId, teamMemberId: teamMember.id },
        ]);
      } catch (error) {
        console.log("Error: ", error);
      }
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

  const getTeamMembers = useCallback(async () => {
    try {
      const teamMembers = await DataStore.query(TeamMember, (teamMember) =>
        teamMember.productionID("eq", productionId)
      );
      const filteredSelectedEmployees = selectedEmployees.filter(
        (selectedEmployee) => selectedEmployee.productionId === productionId
      );
      if (teamMembers.length && !filteredSelectedEmployees.length) {
        const updatedTeamMembers = teamMembers.map((teamMember) => {
          let user = usersProfile.find(
            (userProfile) => userProfile.userId === teamMember.cognitoId
          );
          user.userInfo[4].Value = teamMember.shift;
          return {
            user: { ...user, teamMemberId: teamMember.id },
            productionId: teamMember.productionID,
            teamMemberId: teamMember.id,
          };
        });
        updateSelectedEmployees([...selectedEmployees, ...updatedTeamMembers]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR GETTING TEAM MEMBERS: ", error);
      setIsLoading(false);
    }
  }, [productionId, selectedEmployees, updateSelectedEmployees, usersProfile]);

  useEffect(() => {
    updateUserName(qrResult);
  }, [qrResult]);

  useEffect(() => {
    getTeamMembers();
  }, [getTeamMembers]);

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
          disabled={isLoading}
        />
      </FormControl>
      <Box display="flex" flexWrap="wrap" marginBottom={2}>
        {selectedEmployees.map((selectedEmployee) => (
          <UserCard
            key={selectedEmployee.user.userId}
            userData={selectedEmployee.user}
            productionId={productionId}
            handleUpdateUserTurn={handleUpdateUserTurn}
            handleSelectEmployee={handleSelectEmployee}
          />
        ))}
        {userName &&
          searchedUsers.map((searchedUser) => (
            <UserCard
              key={searchedUser.userId}
              userData={searchedUser}
              productionId={productionId}
              handleUpdateUserTurn={handleUpdateUserTurn}
              handleSelectEmployee={handleSelectEmployee}
            />
          ))}
      </Box>
      <NavigationButton
        path={`/packaging/${productionId}`}
        text="Ready to Production"
        disabled={!selectedEmployees.length || isLoading}
      />
    </SearchEmployeeContainer>
  );
}
