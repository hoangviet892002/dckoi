import { Staff } from "@/models/ProjectType";
import { Button, List, Modal, Pagination, Table, Typography } from "antd";
import React, { useState } from "react";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { assignConsultant } from "@/api/project";
import { useParams } from "react-router-dom";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { messageError } from "@/components";

const Staff = ({ staff }: { staff: Staff[] }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const optionStaff = useAppSelector((state) => state.staff);
  const { id } = useParams();

  const handleOpenOption = () => {
    dispatch(
      staffActions.fetchConstructorStaff({ pageNumber: 1, pageSize: 5 })
    );
    setVisible(true);
  };
  const handleSelectStaff = async (Staffid: string) => {
    const res = await assignConsultant(id, { staffId: Staffid });
    if (res.isSuccess) {
      dispatch(projectStateDetailActions.fetchProjectDetail(id));
    } else {
      messageError(res.message);
    }
    setVisible(false);
    // dispatch()
  };

  const renderModal = () => {
    return (
      <Modal
        visible={visible}
        title="Chọn nhân viên thi công "
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={optionStaff.staffs.data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => {
                    handleSelectStaff(item.id);
                  }}
                >
                  Chọn
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.fullName}
                description={item.email}
              />
            </List.Item>
          )}
        />

        <Pagination
          current={optionStaff.staffs.pageNumber}
          pageSize={optionStaff.staffs.pageSize}
          total={optionStaff.staffs.totalRecords}
          onChange={(page, pageSize) => {
            dispatch(
              staffActions.fetchConstructorStaff({
                pageNumber: page,
                pageSize: pageSize,
              })
            );
          }}
        />
      </Modal>
    );
  };

  return (
    <>
      <Avatar.Group
        size="large"
        max={{
          count: 2,
          style: { color: "#f56a00", backgroundColor: "#fde3cf" },
        }}
      >
        {staff.map((item) => (
          <Avatar src={item.avatar} />
        ))}
      </Avatar.Group>
      <Tooltip title="Thêm nhân viên">
        <Button
          onClick={() => {
            handleOpenOption();
          }}
          type="primary"
          shape="circle"
          icon={<UserOutlined />}
          className="ml-2"
        />
      </Tooltip>

      {renderModal()}
    </>
  );
};

export default Staff;
