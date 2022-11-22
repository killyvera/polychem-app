import { useState, useEffect, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { DataStore } from "@aws-amplify/datastore";
import { Product } from "../models";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#F0F8FF",
}));

const DetailItem = ({ title, count, unit }) => {
  return (
    <Item>
      <Typography component="h6" color="black" fontWeight="bold">
        {title}
      </Typography>
      <Typography
        component="p"
        color="#1976D2"
        marginTop={1}
        fontSize={28}
        fontWeight="bold"
      >
        {count} {unit}
      </Typography>
    </Item>
  );
};

export default function ProductionDetail({ data, productDetail }) {
  if (!data) {
    return (
      <Typography variant="p" fontWeight="bold" textAlign="center">
        Production Detail not found!
      </Typography>
    );
  }

  return (
    <Stack spacing={2} marginTop={2}>
      <DetailItem
        title="Units to Produce"
        count={data.expectedUnits}
        unit="u"
      />
      {productDetail ? (
        <>
          <DetailItem
            title="Packages to Produce"
            count={data.expectedUnits / productDetail.unitsPerPackage}
            unit="Packages"
          />
          <DetailItem
            title="Pallets to Produce"
            count={
              data.expectedUnits /
              productDetail.unitsPerPackage /
              productDetail.packagesPerPallets
            }
            unit="Pallets"
          />
        </>
      ) : null}
    </Stack>
  );
}
