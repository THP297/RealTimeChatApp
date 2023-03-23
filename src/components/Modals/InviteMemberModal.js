import React, { useContext, useState } from "react";
import { Form, Modal, Select, Spin, Avatar } from "antd";
import { AppConText } from "../../Context/AppProvider.";
import { debounce } from "lodash";
import { db } from "../../Firebase/config";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.curmembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, props.curmembers]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.displayName?.chartAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curmembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(10)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curmembers.includes(opt.value));
    });
}
export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    currentRoom,
    currentRoomId,
  } = useContext(AppConText);
  const [value, setValue] = useState();
  const [form] = Form.useForm(); // initialize form using the useForm hook

  const handleOk = () => {
    setIsInviteMemberVisible(false);
    form.resetFields();
    const roomRef = db.collection("rooms").doc(currentRoomId);
    roomRef.update({
      members: [...currentRoom.members, ...value.map((val) => val.value)],
    });
  };

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Invite new members"
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="Member's name"
            value={value}
            placeholder="Search members name"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curmembers={currentRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}
