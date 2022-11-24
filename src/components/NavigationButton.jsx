import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ButtonContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "center",
}));

export default function NavigationButton({
  disabled = false,
  path,
  text,
  onClick,
}) {
  const navigate = useNavigate();

  return (
    <ButtonContainer>
      <Button
        variant="contained"
        disabled={disabled}
        onClick={path ? () => navigate(path) : onClick}
      >
        {text}
      </Button>
    </ButtonContainer>
  );
}
