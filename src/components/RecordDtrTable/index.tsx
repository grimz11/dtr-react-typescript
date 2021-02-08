import './index.less';
import {
  Badge,
  Table,
} from "antd";
import moment from "moment";
import IRecordInput from "../../services/record/dto/recordInput";
const { Column } = Table;

const RecordDtrTable = ({data}:any) => {
  return (
    <Table dataSource={data}>
      <Column title="Status" dataIndex={['created_at', 'currentlyWorking']} key="id" render={(text, record:IRecordInput) => (
         <span style={{ fontWeight: "lighter" }}> <Badge status={record.currentlyWorking ? "success" : "default"}/> {moment(record.created_at, "YYYY MM DD hh:mm:ss A Z")
          .startOf("minutes")
          .fromNow()}</span>
        )}/>
        <Column title="Clocked In" dataIndex="created_at" key="id" render={(created_at:Date) => 
         <span>{moment(created_at, "YYYY MM DD hh:mm:ss A Z").format("hh:mm:ss a")}</span>
        }/>
        <Column title="Clocked Out" dataIndex="timeOut" key="id" render={(timeOut:Date) => 
         <span>{timeOut ? moment(timeOut, "YYYY MM DD hh:mm:ss A Z").format("hh:mm:ss a") : "-"}</span>
        }/>
        <Column
          title="Date"
          dataIndex="created_at"
          key="id"
          render={(created_at:Date) => 
            <span>{moment(created_at, "YYYY MM DD hh:mm:ss A Z").format("MM-DD-YYYY")}</span>
           }
        />
        <Column
          title="Hours Rendered"
          dataIndex="hoursRendered"
          key="id"
        />
    </Table>
  )
}

export default RecordDtrTable;