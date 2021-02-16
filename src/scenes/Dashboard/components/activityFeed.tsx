import { Col, List, Avatar } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import IRecordInput from "../../../services/record/dto/recordInput";
import AppConsts from "../../../utils/appconst";

const ActivityFeed = ({ peopleRecords }: any) => {
  return (
    <Col span={6}>
      <div>
        <span style={{fontSize: "25px", fontWeight: "bold"}}>Activity Feed</span>
      </div>
      <br></br>
      <List
        itemLayout="horizontal"
        dataSource={peopleRecords}
        renderItem={(item: IRecordInput) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Link to={`profile/${item.userId?.id}`}>
                <Avatar size={40} src={item.userId?.avatar ? AppConsts.appBaseUrl + item.userId?.avatar.url : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} style={{cursor: "pointer"}}/>
                </Link>
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
              description={"Test"}
            />
          </List.Item>
        )}
      />
    </Col>
  );
};

export default ActivityFeed;
