import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import DetailsForm from "../Form";
import FormApi from "../../services/api";
import TableData from "../Table";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    width: "100%",
    height: "100%",
    margin: "0",
  },
}));

const createData = (
  flags,
  name,
  capital,
  continents,
  population,
  languages,
  currencies,
  region,
  subregion,
  timezones,
  maps
) => {
  return {
    flags,
    name,
    capital,
    continents,
    population,
    languages,
    currencies,
    region,
    subregion,
    timezones,
    maps,
  };
};

const HomePage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [regionDetails, setRegionDetails] = useState([]);
  const tableRef = useRef();

  const onSubmitForm = (values) => {
    setLoading(true);
    FormApi.getProductDetails(values?.region?.opt)
      .then((res) => {
        setLoading(false);
        setRegionDetails(res?.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const rows =
    regionDetails &&
    regionDetails.map((item) =>
      createData(
        item?.flags?.png,
        item?.name?.common,
        item?.capital,
        item?.continents,
        item?.population,
        `${Object.values(item?.languages)}${" "}`,
        item?.currencies[Object.keys(item?.currencies)]?.name,
        item?.region,
        item?.subregion,
        item?.timezones,
        item?.maps?.googleMaps
      )
    );

  const columns = [
    { id: "flags", label: "Flag", minWidth: 50 },
    { id: "name", label: "Country", minWidth: 170 },
    { id: "capital", label: "Captial", minWidth: 170 },
    {
      id: "continents",
      label: "Continent",
      minWidth: 100,
    },
    { id: "population", label: "Population", minWidth: 100 },
    { id: "languages", label: "Languages", minWidth: 100 },
    { id: "currencies", label: "Currencies", minWidth: 100 },
    { id: "region", label: "Region", minWidth: 100 },
    { id: "subregion", label: "Sub region", minWidth: 100 },
    { id: "timezones", label: "Timezones", minWidth: 100 },
    { id: "maps", label: "View Map", minWidth: 100 },
  ];

  useEffect(() => {
    if (tableRef.current)
      tableRef.current.scrollIntoView({ behavior: "smooth" });
  }, [regionDetails]);

  return (
    <Grid
      container
      direction="row"
      spacing={8}
      className={classes.rootContainer}
    >
      <Grid item xs={12}>
        <DetailsForm
          onSubmitForm={onSubmitForm}
          loading={loading}
          regionDetails={regionDetails}
        />
      </Grid>
      {!_.isEmpty(regionDetails) && (
        <Grid item xs={12} ref={tableRef}>
          <TableData rows={rows} columns={columns} />
        </Grid>
      )}
    </Grid>
  );
};

export default HomePage;
