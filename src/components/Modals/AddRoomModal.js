import React, { useContext } from "react";
import { Form, Input, Modal } from "antd";
import { AppConText } from "../../Context/AppProvider.";
import { AuthConText } from "../../Context/AuthProvider";
import { addDocument } from "../../Firebase/service";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppConText);
  const { user } = useContext(AuthConText);
  const uid = user ? user.uid : null;

  const [form] = Form.useForm(); // initialize form using the useForm hook

  const handleOk = () => {
    console.log({ formData: form.getFieldsValue() });
    setIsAddRoomVisible(false);
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    form.resetFields();
  };

  const handleCancel = () => {
    setIsAddRoomVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Create room"
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room's name" name="name">
            <Input placeholder="Type room's name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Type description for the room" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
