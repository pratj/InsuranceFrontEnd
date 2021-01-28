import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import "../RenderForm.css";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from "@material-ui/core";
import "date-fns";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color:"#b58500"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"gold"
  },
}));

function RenderForm({ formFields, onSubmit }) {
  var validations;
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const handlePattern = (validation) => {
    let tempValidation = validation;
    tempValidation["pattern"]["value"] = new RegExp(validation.pattern.value);
    validations = tempValidation;
  };

  const handleValidations = (validation) => {
    validations = validation;
  };

  const renderFields = (fields) => {
    return fields.map((field) => {
      const { name, type, label, placeholder, validation } = field;
      {
        validation.hasOwnProperty("pattern")
          ? handlePattern(validation)
          : handleValidations(validation);
      }

      switch (type) {
        case "text":
        case "email":
        case "tel":
        case "number":
          return (
            <div key={name}>
              <TextField
                id={name}
                name={name}
                type={type}
                label={label}
                placeholder={placeholder}
                inputRef={register(validations)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors[name] && (
                <span style={{ color: "red" }}>* {errors[name].message}</span>
              )}
            </div>
          );

        case "date":
          return (
            <div key={name}>
              <TextField
                className="date"
                id={name}
                name={name}
                type={type}
                label={label}
                placeholder={placeholder}
                inputRef={register(validations)}
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              {errors[name] && (
                <span style={{ color: "red" }}>* {errors[name].message}</span>
              )}
            </div>
          );

        case "select":
          return (
            <div key={name}>
              <select id={name} name={name} inputRef={register(validations)}>
                <option value="">Select Destination..</option>
                <option value="India">India</option>
                <option value="England">England</option>
                <option value="Australia">Australia</option>
                <option value="USA">USA</option>
              </select>
              {errors[name] && (
                <span style={{ color: "red" }}>* {errors[name].message}</span>
              )}
              {/* <Controls.CountrySelect /> */}
              {/* <Controls.Asynchronous name={name} ref={register}/> */}
            </div>
          );

        case "radio":
          return (
            <div key={name}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup row name={name}>
                  {field.items.map((item) => {
                    return (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio inputRef={register(validations)} />}
                        label={item.label}
                        labelPlacement="end"
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </div>
          );

        default:
          return (
            <div key={name}>
              <span style={{ color: "red" }}>Invalid Field</span>
            </div>
          );
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs" className="renderForm">
      <div className={classes.paper}>
        <Typography variant="subtitle1">
          Provide the following details
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {renderFields(formFields)}
          <FormControlLabel
            control={<Switch name="sendUpdates" inputRef={register} />}
            label="Get updates on Email"
          />
          <Button
            className="button"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ borderRadius: "15px" }} 
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default RenderForm;
