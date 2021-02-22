import { Modal, Progress } from "antd";
import React from "react";
import "./index.less";

const ProgressModal = ({ percent }: any) => {
  return (
    <>
      <Modal
        className="progressModal"
        visible={percent === 100 ? false : true}
        destroyOnClose={true}
        centered
        closable={false}
        footer={null}
      >
        <Progress
          type="circle"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={percent}
        />
      </Modal>
    </>
  );
};

export default ProgressModal;
