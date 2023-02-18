import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Input,
} from 'antd';

const CreateProfileCardModal = (props) => {
  const {
    visible,
    onClose = () => {},
    onCreate = () => {},
  } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        try {
          const result = await form.validateFields();
          onCreate(result.name);
        } catch(error) {
          return;
        }
      }}
      title="연락처 생성"
      width={400}
    >
      <Form form={form}>
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: '이름은 필수값입니다.' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateProfileCardModal.propTypes = {
  visible: PropTypes.bool,

};

export default CreateProfileCardModal;
