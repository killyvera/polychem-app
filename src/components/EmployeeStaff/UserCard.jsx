import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const UserCardContainer = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  width: "45%",
  margin: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export default function UserCard({
  userData,
  handleSelectEmployee,
  selectedEmployee,
  handleUpdateUserTurn,
}) {
  return (
    <UserCardContainer>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            {userData.userInfo[1].Value.charAt(0)}
          </Avatar>
        }
        title={userData.userInfo[1].Value}
        subheader={userData.userInfo[0].Value}
      />
      <CardContent sx={{ padding: "0 1rem" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          alignItems="center"
        >
          <PhoneIcon sx={{ width: "1.25rem", color: "#1976D2" }} />
          <span style={{ marginLeft: "0.5rem" }}>
            {userData.userInfo[2].Value}
          </span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          alignItems="center"
        >
          <EmailIcon sx={{ width: "1.25rem", color: "#1976D2" }} />
          <span style={{ marginLeft: "0.5rem" }}>
            {userData.userInfo[3].Value}
          </span>
        </Typography>
        {selectedEmployee && (
          <FormControl>
            <FormLabel id="choose-shift">
              <Typography
                variant="p"
                component="p"
                fontWeight="bold"
                color="#1976D2"
                marginTop={2}
              >
                Choose Shift:
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="choose-shift"
              name="turn"
              value={userData.userInfo[4].Value}
              onChange={(ev) => handleUpdateUserTurn(ev, userData.userId)}
            >
              <FormControlLabel
                value="morning"
                control={<Radio />}
                label="Morning"
              />
              <FormControlLabel
                value="evening"
                control={<Radio />}
                label="Evening"
              />
            </RadioGroup>
          </FormControl>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          size="small"
          sx={{ margin: "0.5rem auto" }}
          onClick={() => handleSelectEmployee(userData, !!selectedEmployee)}
        >
          {selectedEmployee ? "Remove" : "Select"}
        </Button>
      </CardActions>
    </UserCardContainer>
  );
}
