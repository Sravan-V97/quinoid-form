import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  makeStyles,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import differenceInYears from "date-fns/differenceInYears";
import logo from "../../images/logo-dark.png";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formRoot: {
    maxWidth: "500px",
    width: "calc(100% - 60%)",
    padding: "4rem 2rem",
    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 50%)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 27%)",
      padding: "2.5rem 2rem",
    },
    "& .MuiTypography-body2": {
      paddingTop: "8px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "8px",
      "& .MuiButtonBase-root": {
        padding: "6px",
      },
    },
  },
  appLogo: {
    width: "200px",
    paddingBottom: "2rem",
  },
  btnstyle: {
    color: "#ffffff",
    fontWeight: 600,
    textTransform: "capitalize",
    fontSize: "1rem",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: theme.palette.primary.main,
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "60%",
    left: "50%",
    marginTop: -10,
    marginLeft: -12,
  },

  checkBox: {
    justifyContent: "center",
    alignItems: "center",
    "& .MuiFormControlLabel-root": {
      margin: 0,
    },
    "& .Mui-error": {
      margin: "0 0 8px 0",
    },
  },
  regionDropdown: {
    "& .MuiAutocomplete-endAdornment": {
      top: "calc(50% - 18px)",
    },
  },
}));

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Please enter your Name")
    .matches(/^[a-z\d\$\s]+$/i, "Please enter a valid Name"),
  userEmail: Yup.string()
    .email("Please enter a valid Email ID")
    .required("Please enter your Email ID"),
  dateOfBirth: Yup.date()
    .nullable()
    .required("Please enter your Date Of Birth")
    .test(
      "DOB",
      "Age should be a minimum of 18",
      (date) => differenceInYears(new Date(), new Date(date)) >= 18
    ),
  region: Yup.object().nullable().required("Please select your Region"),
  terms: Yup.bool().oneOf([true], "Please select the above option"),
});

const DetailsForm = ({ onSubmitForm, loading }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userName: "",
      dateOfBirth: null,
      region: null,
      terms: true,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = (values) => {
    onSubmitForm(values);
  };

  return (
    <form className={classes.rootContainer} onSubmit={formik.handleSubmit}>
      <Paper elevation={10} className={classes.formRoot}>
        <Grid align="center">
          <img src={logo} alt={"Zreya"} className={classes.appLogo} />
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              name="userName"
              label="Name"
              type="text"
              placeholder="Enter Your Fullname"
              margin="dense"
              variant="outlined"
              fullWidth
              value={_.get(formik.values, "userName", "")}
              error={formik.errors.userName && formik.touched.userName}
              helperText={
                formik.errors.userName &&
                formik.touched.userName &&
                formik.errors.userName
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputProps={{ maxLength: 25 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userEmail"
              label="Email Id"
              placeholder="Enter Your Email Id"
              margin="dense"
              variant="outlined"
              type="email"
              fullWidth
              value={_.get(formik.values, "userEmail", "")}
              error={formik.errors.userEmail && formik.touched.userEmail}
              helperText={
                formik.errors.userEmail &&
                formik.touched.userEmail &&
                formik.errors.userEmail
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12}>
            <DatePicker
              name="dateOfBirth"
              id="dateOfBirth"
              autoOk
              fullWidth
              margin="dense"
              variant="inline"
              inputVariant="outlined"
              label="D.O.B"
              format="yyyy-MM-dd"
              value={_.get(formik.values, "dateOfBirth", null)}
              error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
              helperText={
                formik.errors.dateOfBirth &&
                formik.touched.dateOfBirth &&
                formik.errors.dateOfBirth
              }
              disableFuture
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <DateRangeIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(date) =>
                formik.setFieldValue("dateOfBirth", format(date, "yyyy-MM-dd"))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="region"
              name="region"
              className={classes.regionDropdown}
              onChange={(event, newValue) => {
                formik.setFieldValue("region", newValue);
              }}
              options={regionOptions}
              value={_.get(formik.values, "region", null)}
              getOptionLabel={(option) => option?.name}
              getOptionSelected={(option, value) => option?.opt === value?.opt}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="region"
                  label="Region"
                  variant="outlined"
                  margin="dense"
                  placeholder="Select your Region"
                  fullWidth
                  error={formik.errors.region && formik.touched.region}
                  helperText={
                    formik.errors.region &&
                    formik.touched.region &&
                    formik.errors.region
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={classes.checkBox}
              required
              error={formik.errors.terms}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id="terms"
                    name="terms"
                    color="primary"
                    checked={_.get(formik.values, "terms", true)}
                    onChange={formik.handleChange}
                  />
                }
                label="I agree to Terms and Conditions"
              />
              <FormHelperText>{formik.errors.terms}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <div className={classes.wrapper}>
          <Button
            color="primary"
            variant="contained"
            className={classes.btnstyle}
            fullWidth
            disableElevation
            disabled={loading}
            type="submit"
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Paper>
    </form>
  );
};
export default DetailsForm;

const regionOptions = [
  { opt: "asia", name: "Asia" },
  { opt: "africa", name: "Africa" },
  { opt: "america", name: "America" },
  { opt: "europe", name: "Europe" },
  { opt: "oceania", name: "Oceania" },
];
