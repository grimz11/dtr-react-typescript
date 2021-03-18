import { Row, Col, List, Avatar, Tooltip } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import IRecordInput from "../../../services/record/dto/recordInput";

const ActivityFeed = ({ peopleRecords }: any) => {
  return (
    <Col span={24} className="dashboard-col-activity-feed-dark-theme">
      <div>
        <span style={{ fontSize: "25px", fontWeight: "bold" }}>
          Activity Feed
        </span>
      </div>
      <br></br>
      <List
        style={{ maxHeight: "60vh", overflowY: "auto" }}
        itemLayout="horizontal"
        dataSource={peopleRecords}
        renderItem={(item: IRecordInput, i) => (
          <List.Item key={i}>
            <List.Item.Meta
              avatar={
                <Tooltip
                  title="View Profile"
                  color="#1890ff"
                  placement="bottom"
                >
                  <Link to={`account/profile/${item.userId?.id}`}>
                    <Avatar
                      size={40}
                      src={
                        item.userId?.avatar
                          ? item.userId?.avatar.url
                          : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </Tooltip>
              }
              title={
                `${item.userId?.firstname?.charAt(0).toLocaleUpperCase()}` +
                `${item.userId?.firstname?.substring(1).toLocaleLowerCase()} ` +
                (item.timeOut != null
                  ? `has clocked out ` +
                    moment(item.timeOut, "YYYY MM DD hh:mm:ss A Z")
                      .startOf("minutes")
                      .fromNow()
                  : "has clocked in " +
                    moment(item.created_at, "YYYY MM DD hh:mm:ss A Z")
                      .startOf("minutes")
                      .fromNow())
              }
              // description={"Test"}
            />
          </List.Item>
        )}
      />
    </Col>
  );
};

export default ActivityFeed;
