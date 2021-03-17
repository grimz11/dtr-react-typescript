import * as React from "react";
import { Col } from "antd";
import "./index.less";
import moment from "moment";

const Footer = () => {
  return (
    <Col className={"footer"}>
      Hyperstacks Inc. - {moment(Date.now()).format("YYYY").toString()}
    </Col>
  );
};
export default Footer;
