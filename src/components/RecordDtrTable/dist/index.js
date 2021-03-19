"use strict";
exports.__esModule = true;
require("./index.less");
var antd_1 = require("antd");
var moment_1 = require("moment");
var react_router_dom_1 = require("react-router-dom");
var ClockOutMotivation_1 = require("./ClockOutMotivation");
var Column = antd_1.Table.Column;
var RecordDtrTable = function (_a) {
    var data = _a.data, dataSize = _a.dataSize;
    data.map(function (item, i) {
        data[i].key = "item" + item.id;
    });
    var location = react_router_dom_1.useLocation();
    var currentPath = location.pathname;
    return (React.createElement(antd_1.Table, { dataSource: data, pagination: { pageSize: dataSize }, key: "id", scroll: { x: 650 }, className: "dashboard-dtr-dark-theme" },
        React.createElement(Column, { title: "Status", dataIndex: ["created_at", "currentlyWorking"], key: "id", render: function (text, record) {
                var checkTimeRendered = moment_1["default"]
                    .duration(moment_1["default"]().diff(record.created_at))
                    .asHours();
                return (React.createElement("span", { style: { fontWeight: "lighter" } },
                    React.createElement(antd_1.Tooltip, { title: ClockOutMotivation_1.clockOutMotivations[1], color: "#1890ff", placement: "bottom", visible: checkTimeRendered >= 9 &&
                            record.currentlyWorking &&
                            currentPath === "/dashboard"
                            ? true
                            : false, className: record.currentlyWorking ? "tool-tip-alive" : "" },
                        React.createElement(antd_1.Badge, { status: record.currentlyWorking && checkTimeRendered < 9
                                ? "success"
                                : checkTimeRendered >= 9 && record.currentlyWorking
                                    ? "error"
                                    : "default" })),
                    moment_1["default"](record.created_at, "YYYY MM DD hh:mm:ss A Z")
                        .startOf("minutes")
                        .fromNow()));
            } }),
        React.createElement(Column, { title: "Clocked In", dataIndex: "created_at", key: "id", render: function (created_at) { return (React.createElement("span", null, moment_1["default"](created_at, "YYYY MM DD hh:mm:ss A Z").format("hh:mm:ss a"))); } }),
        React.createElement(Column, { title: "Clocked Out", dataIndex: "timeOut", key: "timeOut", render: function (timeOut) { return (React.createElement("span", null, timeOut
                ? moment_1["default"](timeOut, "YYYY MM DD hh:mm:ss A Z").format("hh:mm:ss a")
                : "-")); } }),
        React.createElement(Column, { title: "Date", dataIndex: "created_at", key: "created_at", render: function (created_at) { return (React.createElement("span", null, moment_1["default"](created_at, "YYYY MM DD hh:mm:ss A Z").format("MM-DD-YYYY"))); } }),
        React.createElement(Column, { title: "Hours Rendered", 
            // dataIndex="renderedHours"
            key: "hoursRendered", render: function (text, record) {
                var hoursRendered = "";
                var startTime = moment_1["default"](record.created_at);
                var now = record.timeOut == null ? moment_1["default"]() : moment_1["default"](record.timeOut);
                var duration = moment_1["default"].duration(now.diff(startTime));
                var hours = duration.days() * 24 + duration.hours();
                hours = hours < 10 ? "0" + hours : hours;
                var minutes = duration.minutes() < 10
                    ? "0" + duration.minutes()
                    : duration.minutes();
                var seconds = duration.seconds() < 10
                    ? "0" + duration.seconds()
                    : duration.seconds();
                hoursRendered = hours + ":" + minutes + ":" + seconds;
                return React.createElement("span", null, hoursRendered);
            } }),
        currentPath === "/employee" && (React.createElement(Column, { title: "Name", key: "nameOfEmployee", render: function (text, record) {
                return React.createElement(antd_1.Tag, { color: "blue" }, record.userId.firstname);
            } }))));
};
exports["default"] = RecordDtrTable;
