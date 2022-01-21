import * as React from "react";
import { FC } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

const CustomTextField = styled(TextField)<{ active: boolean }>`
  cursor: pointer;

  & .MuiInputBase-input {
    height: 50px;
    cursor: pointer;
  }
  & .MuiAutocomplete-input {
    color: #000;
    transition: 0.3s;
  }
  & .MuiOutlinedInput-root {
    padding: 0;
    border-radius: 0px;
    border: 0;
  }
  & input {
    background: #1d1d1d;
    width: 100%;
    transition: 0.3s;

    &:focus {
      background: #f5af27;
      border-color: #f5af27;
      transition: 0.3s;
    }
    &::placeholder {
      color: ${({ active }) => (active ? "#f5af27" : "#fff")};
      opacity: 1;
      font-weight: 500;
      transition: 0.3s;
    }
    &:focus {
      &::placeholder {
        color: #000;
        font-weight: 500;
        transition: 0.3s;

        opacity: 1;
      }
    }
  }
  & .MuiOutlinedInput-root {
    position: relative;
    ::before {
      content: " ";
      display: block;
      width: 7px;
      height: 7px;
      border: solid 1px #f5af27;
      border-top: 0;
      border-left: 0;
      position: absolute;
      right: 15px;
      top: 25px;
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    & fieldset {
      transition: 0.3s;
      border-color: #1d1d1d;
    }
    &:hover fieldset {
      transition: 0.3s;
      border-color: #1d1d1d;
    }
    &.Mui-focused fieldset {
      transition: 0.3s;
      border-color: #f5af27;
    }
  }
`;
const CustomLi = styled("li", {
  shouldForwardProp: (prop) => prop !== "checked",
})<{
  checked?: boolean;
}>`
  background: #1d1d1d;

  color: ${({ checked }) => (checked ? "#f5af27" : "#fff")};
  font-size: 0.9em;
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: end;
  cursor: pointer;
  ::before {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    background: ${({ checked }) => (checked ? "#f5af27" : "#4a4a4a")};
    position: absolute;
    left: 15px;
    top: 14px;
  }
  ${({ checked }) =>
    checked
      ? `::after {
          content: " ";
          display: block;
          width: 12px;
          height: 9px;
          background: url("/checked.png") no-repeat;
          background-size: 12px 20px;
          position: absolute;
          left: 19px;
          top: 20px;
      }`
      : `&:hover {
          ::after {
            content: " ";
            display: block;
            width: 12px;
            height: 9px;
            background: url("/checked.png") no-repeat;
            background-size: 12px 20px;
            position: absolute;
            left: 19px;
            top: 20px;
          }
        }`}
`;
const TextOption = styled("p")`
  width: 70%;
`;

export const CheckBoxList: FC<{
  placeholder: string;
  valueCheck: any;
  setValue: any;
  defaultValue: any;
}> = (props) => {
  const customTheme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          listbox: {
            padding: 0,
            borderRadius: 0,
          },
          root: {
            borderLeft: "2px solid #4a4a4a",
            width: "20%",
            "@media (max-width: 990px)": {
              width: "33%",
              borderLeft: "none",
              borderBottom: "2px solid #4a4a4a",
            },
            "@media (max-width: 460px)": {
              width: "49%",
            },
            "@media (max-width: 375px)": {
              width: "98%",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Autocomplete
        value={props.defaultValue}
        multiple
        freeSolo
        id="checkboxes-tags-demo"
        options={props.valueCheck}
        onChange={(event, value) => props.setValue(value)}
        disableCloseOnSelect
        defaultValue={props.defaultValue}
        disableClearable
        renderTags={() => null}
        getOptionLabel={(option) => option.title}
        renderOption={({ className, ...props }, option, { selected }) => {
          return (
            <CustomLi {...props} checked={selected}>
              <TextOption>{option.title}</TextOption>
            </CustomLi>
          );
        }}
        renderInput={(params) => {
          return (
            <CustomTextField
              active={props.defaultValue.length > 0}
              {...params}
              placeholder={props.placeholder}
            />
          );
        }}
      />
    </ThemeProvider>
  );
};
