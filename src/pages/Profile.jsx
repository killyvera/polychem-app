import { useState, useEffect, useCallback } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Toolbar,
  Button,
  Badge,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Stack } from "@mui/system";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Storage } from "aws-amplify";
import { QrCodeGenerator } from "../helpers/QrCodeGenerator";

const AddImageButton = ({ disabled, onChange, loading }) => {
  return (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="label"
      disabled={disabled}
    >
      <input hidden accept="image/*" type="file" onChange={onChange} />
      {loading ? <CircularProgress size={24} /> : <AddAPhotoIcon />}
    </IconButton>
  );
};

export function Profile({ signOut, user }) {
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log("User Sign Out Error: ", error);
    }
  };

  const onChange = async (e) => {
    try {
      setLoading(true);
      const avatarImage = e.target.files[0];
      await Storage.put(`avatar/${user.username}.png`, avatarImage, {
        contentType: "image/png",
      });
      const profileImageLink = await Storage.get(`avatar/${user.username}.png`);
      setAvatar(profileImageLink);
      setLoading(false);
    } catch (error) {
      console.log("Profile Image Update Error: ", error);
      setLoading(false);
    }
  };

  const getAvatar = useCallback(async () => {
    try {
      const profileImageLink = await Storage.get(`avatar/${user.username}.png`);
      setAvatar(profileImageLink);
      setLoading(false);
    } catch (error) {
      console.log("Profile Image Error: ", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  return (
    <Authenticator>
      <Box style={{ maxHeight: "300px" }}>
        <Container>
          <Typography variant="h4">Perfil de Usuario</Typography>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10vh",
            }}
          >
            <Badge
              badgeContent={
                <AddImageButton
                  style={{ margin: "" }}
                  color="primary"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  loading={loading}
                  disabled={loading}
                  onChange={onChange}
                />
              }
            >
              <Avatar
                sx={{ bgcolor: blue[500], width: 124, height: 124 }}
                src={avatar}
                aria-label="recipe"
              />
            </Badge>
            <Toolbar>
              <Typography variant="h5">{user.attributes.name}</Typography>
            </Toolbar>
            <Box>
              <Typography variant="h6">
                Dpto. {user.attributes["custom:departamento"]}
              </Typography>
              <Typography>Cargo {user.attributes["custom:puesto"]}</Typography>
            </Box>
            <Box>
              <Toolbar>
                <EmailIcon style={{ marginRight: "12px" }} />
                <Typography>{user.attributes.email}</Typography>
              </Toolbar>
              <Toolbar style={{ marginTop: "-25px" }}>
                <ContactPhoneIcon style={{ marginRight: "12px" }} />
                <Typography>{user.attributes.phone_number}</Typography>
              </Toolbar>
            </Box>
            <Stack spacing={1} mt={1}>
              <QrCodeGenerator userId={user.username} />
              <Button onClick={handleSignOut} variant="contained" size="small">
                <ExitToAppIcon style={{ marginRight: "7px" }} />
                Salir
              </Button>
            </Stack>
          </Container>
        </Container>
      </Box>
    </Authenticator>
  );
}
