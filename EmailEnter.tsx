import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputBase from "@mui/material/InputBase";
import { BtnComponent } from "./Btn";

const ContainerInf = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 2%;
`;
const EventText = styled("div")<{ size?: string; bottom?: string }>`
  text-align: center;
  margin-bottom: ${({ bottom }) => (bottom ? bottom : "20px")};
  width: 80%;
  color: #fff;
  font-size: ${({ size }) => (size ? size : "1.6em")};
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
`;
const CustomPaper = styled(Paper)<{ width?: string }>`
  margin-top: 25px;
  width: ${({ width }) => (width ? width : "90%")};
  background: #000;
  border: 1px solid #fff;
  color: red;
  @media (max-width: 1340px) {
    width: ${({ width }) => (width ? width : "100%")};
  }
`;

const CustomInputBase = styled(InputBase)`
  width: calc(100% - 50px);
  & input {
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }
`;
const Description = styled("div", {
  shouldForwardProp: (prop) => prop !== "widthDescription",
})<{ widthDescription?: string }>`
  font-size: 0.688em;
  color: #999;
  text-align: center;
  line-height: 15px;
  width: ${({ widthDescription }) =>
    widthDescription ? widthDescription : "80%"};
  padding: 5px 20px 0 20px;
  @media (max-width: 1340px) {
    width: ${({ widthDescription }) =>
      widthDescription ? widthDescription : "100%"};
  }
`;
export const EmailEnter: React.FC<{
  title: string;
  size?: string;
  width?: string;
  widthDescription?: string;
  bottom?: string;
}> = ({ title, size, width, widthDescription, bottom }) => {
  return (
    <ContainerInf>
      <EventText size={size} bottom={bottom}>
        {title}
      </EventText>
      <CustomPaper width={width}>
        <IconButton sx={{ p: "10px" }} aria-label="email">
          <MailOutlineIcon style={{ color: "#f5af27" }} />
        </IconButton>
        <CustomInputBase placeholder="Enter your email address" />
      </CustomPaper>
      <Description widthDescription={widthDescription}>
        * Submitting your email will also subscribe you to our informational
        newsletter
      </Description>
      <BtnComponent title="Subscribe" url="#" />
    </ContainerInf>
  );
};
