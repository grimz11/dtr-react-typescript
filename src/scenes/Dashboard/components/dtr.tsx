import { Row, Col, Button, Spin } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";

import RecordDtrTable from "../../../components/RecordDtrTable";

const DTR = ({ data: props, handleOnClick }: any) => {
  const data = props.personRecord;
  return (
    <Row>
      <Col span={24} className="col-1-time-in">
        <div>
          <Button
            type={"primary"}
            shape="round"
            icon={<FieldTimeOutlined />}
            size="large"
            danger={props.timeBtn && props.timeBtn ? true : false}
            onClick={handleOnClick}
          >
            {props.timeBtn && props?.timeBtn ? "Clock Out" : "Clock In"}
          </Button>
        </div>
        <br></br>
        <Spin spinning={props?.loadingDtr} size="large" tip="Loading...">
          <RecordDtrTable data={data} dataSize={8} />
        </Spin>
      </Col>
    </Row>
  );
};

export default DTR;
