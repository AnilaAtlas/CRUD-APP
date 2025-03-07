import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Table, Modal, message } from 'antd';
import axios from 'axios';

const urlApi = 'http://localhost:3000';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${urlApi}/users`);
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add or Update user
  const onFinish = async (values) => {
    try {
      if (editingUser) {
        await axios.put(`${urlApi}/updateuser/${editingUser.id}`, values);
        message.success('User updated successfully');
      } else {
        await axios.post(`${urlApi}/adduser`, values);
        message.success('User added successfully');
      }
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error('Failed to save user');
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${urlApi}/deleteuser/${id}`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  // Show modal for adding or editing user
  const showModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => deleteUser(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: '20px' }}>
        Add User
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {editingUser ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;