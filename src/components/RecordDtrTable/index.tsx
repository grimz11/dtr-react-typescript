import "./index.less";
import { Badge, Table, Tag, Tooltip } from "antd";
import moment from "moment";
import IRecordInput from "../../services/record/dto/recordInput";
import { useLocation } from "react-router-dom";
const { Column } = Table;

const RecordDtrTable = ({ data, dataSize }: any) => {
  data.map((item: any, i: number) => {
    data[i].key = "item" + item.id;
  });
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Table
      dataSource={data}
      pagination={{ pageSize: dataSize }}
      key="id"
      scroll={{ x: 650 }}
    >
      <Column
        title="Status"
        dataIndex={["created_at", "currentlyWorking"]}
        key="id"
        render={(text, record: IRecordInput) => {
          const checkTimeRendered = moment
            .duration(moment().diff(record.created_at))
            .hours();
          // console.log("checkTimeRendered", checkTimeRendered);
          return (
            <span style={{ fontWeight: "lighter" }}>
              <Tooltip
                title="You spend more than 8 hours already! Get a life!"
                color="#1890ff"
                placement="bottom"
                // visible={
                //   checkTimeRendered >= 8 && record.currentlyWorking
                //     ? true
                //     : false
                // }
                style={
                  checkTimeRendered >= 8 && record.currentlyWorking
                    ? { display: "" }
                    : { display: "none" }
                }
              >
                <Badge
                  status={
                    record.currentlyWorking && checkTimeRendered < 8
                      ? "success"
                      : checkTimeRendered >= 9 && record.currentlyWorking
                      ? "error"
                      : "default"
                  }
                />
              </Tooltip>
              {moment(record.created_at, "YYYY MM DD hh:mm:ss A Z")
                .startOf("minutes")
                .fromNow()}
            </span>
          );
        }}
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
        render={(text, record: IRecordInput) => {
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
      {currentPath === "/employee" && (
        <Column
          title="Name"
          key="nameOfEmployee"
          render={(text, record: IRecordInput) => {
            return <Tag color="blue">{record.userId.firstname}</Tag>;
          }}
        />
      )}
    </Table>
  );
};

export default RecordDtrTable;
