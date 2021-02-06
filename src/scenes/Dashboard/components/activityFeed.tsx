import './index.less';
import {
  Col,
  List,
  Avatar,
} from "antd";
import moment from 'moment';

import IRecordInput from '../../../services/record/dto/recordInput';

const ActivityFeed = ({peopleRecords}:any) => {
  return (
    <Col span={8}>
    <div>
      <h1>Activity Feed</h1>
    </div>
    <br></br>
    <List
      itemLayout="horizontal"
      dataSource={peopleRecords}
      renderItem={(item: IRecordInput) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
            }
            
            title={`${item.userId?.username?.toUpperCase()} was login ` + moment(
              item.created_at,
              "YYYY MM DD hh:mm:ss A Z"
            )
              .startOf("minutes")
              .fromNow()}
            description={"Test"}
          />
        </List.Item>
      )}
    />
  </Col>
  )
}

export default ActivityFeed;