import "./index.less";
import { Badge, Table } from "antd";
import moment from "moment";
import IRecordInput from "../../services/record/dto/recordInput";
const { Column } = Table;

const RecordDtrTable = ({ data, dataSize }: any) => {
  data.map((item: any, i: number) => {
    data[i].key = "item" + item.id;
  });
  return (
    <Table dataSource={data} pagination={{ pageSize: dataSize }} key="id">
      <Column
        title="Status"
        dataIndex={["created_at", "currentlyWorking"]}
        key="id"
        render={(text, record: IRecordInput) => (
          <span style={{ fontWeight: "lighter" }}>
            {" "}
            <Badge
              status={record.currentlyWorking ? "success" : "default"}
            />{" "}
            {moment(record.created_at, "YYYY MM DD hh:mm:ss A Z")
              .startOf("minutes")
              .fromNow()}
          </span>
        )}
      />
      <Column
        title="Clocked In"
        dataIndex="created_at"
        key="id"
        render={(created_at: Date) => (
          <span>
            {moment(created_at, "YYYY MM DD hh:mm:ss A Z").format("hh:mm:ss a")}
          </span>
        )}
      />
      <Column
        title="Clocked Out"
        dataIndex="timeOut"
        key="timeOut"
        render={(timeOut: Date) => (
          <span>
            {timeOut
              ? moment(timeOut, "YYYY MM DD hh:mm:ss A Z").format("hh:mm:ss a")
              : "-"}
          </span>
        )}
      />
      <Column
        title="Date"
        dataIndex="created_at"
        key="created_at"
        render={(created_at: Date) => (
          <span>
            {moment(created_at, "YYYY MM DD hh:mm:ss A Z").format("MM-DD-YYYY")}
          </span>
        )}
      />
      {/* <Column title="Hours Rendered" dataIndex="hoursRendered" key="id" /> */}
      <Column
        title="Hours Rendered"
        // dataIndex="renderedHours"
        key="hoursRendered"
        render={(text, record: any) => {
          let hoursRendered = "";
          let startTime = moment(record.created_at);
          let now = record.timeOut == null ? moment() : moment(record.timeOut);
          let duration: any = moment.duration(now.diff(startTime));
          let hours = duration.days() * 24 + duration.hours();
          hours = hours < 10 ? "0" + hours : hours;
          let minutes =
            duration.minutes() < 10
              ? "0" + duration.minutes()
              : duration.minutes();
          let seconds =
            duration.seconds() < 10
              ? "0" + duration.seconds()
              : duration.seconds();
          hoursRendered = hours + ":" + minutes + ":" + seconds;

          return <span>{hoursRendered}</span>;
        }}
      />
    </Table>
  );
};

export default RecordDtrTable;
