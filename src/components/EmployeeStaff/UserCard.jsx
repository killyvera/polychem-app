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

export default function UserCard({
  userData,
  handleSelectEmployee,
  selectedEmployee,
}) {
  return (
    <Card sx={{ width: "47.5%", margin: "0.5rem" }}>
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
    </Card>
  );
}
