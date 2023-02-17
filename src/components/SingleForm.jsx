import React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { checkIfExpireNextWorkingDay, checkIfExpireToday } from "../utils";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
  display: "flex",
  flexDirection: "column",
}));

export default function SingleForm(props) {
  const { data } = props;
  let expText = "";

  const expireToday = checkIfExpireToday(data.expirationDate);
  const expireNextWorkingDay = checkIfExpireNextWorkingDay(data.expirationDate); 

  const setBackgroundColor = () => {
    if (data.planned && data.expire) {
      expText = `Expired: ${data.expirationDate}`;
      return "#D56133";
    } else if (expireToday && data.planned) {
      expText = "Expire Today";
      return "#BF9000";
    } else if (expireNextWorkingDay && data.planned) {
      expText = "Expire Next Working Day";
      return "#94BB4D";
    } else if (data.sent && data.expire) {
      expText = `Expired: ${data.expirationDate}`;
      return "#D1376E";
    } else if (expireToday && data.sent) {
      expText = "Expire Today";
      return "#7E40C8";
    } else if (expireNextWorkingDay && data.sent) {
      expText = "Expire Next Working Day";
      return "#3C57CC";
    }
    return "#D56133";
  };

  return (
    <Link
      style={{ textDecoration: "blink" }}
      to={`/production-form/${data.id}`}
    >
      <Item style={{ backgroundColor: setBackgroundColor() }}>
        <Typography variant="p" fontWeight="bold">
          {data.name}
        </Typography>
        <Typography variant="p">{data.description}</Typography>
        <Typography variant="p" marginTop={2}>
          <span style={{ fontWeight: "bold" }}>{expText}</span>
        </Typography>
      </Item>
    </Link>
  );
}
