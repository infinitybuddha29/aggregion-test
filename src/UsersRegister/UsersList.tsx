import React from 'react';
import { Form, Field } from 'react-final-form';
import { Input, Alert, DatePicker, Space, Button } from 'antd';
import dayjs from 'dayjs';
import { onlyNumbers, disabledDate, getDateOfBirth } from './utils';
import { DateOfBirth, User } from './types';

type UserListProps = {
  users: User[];
  onDeleteUser: (id: string) => void;
  onUpdateUser: (updatedUser: User) => void;
};

const UserList: React.FC<UserListProps> = ({
  users,
  onDeleteUser,
  onUpdateUser,
}) => {
  const handleDeleteUser = (id: string) => {
    onDeleteUser(id);
  };

  const handleUpdateUser = ({
    phone,
    dayOfBirth,
    monthOfBirth,
    yearOfBirth,
    ...updatedUser
  }: User & DateOfBirth) => {
    console.log(phone);
    onUpdateUser({
      ...updatedUser,
      phone: phone ? `+7${phone}` : undefined,
      dateOfBirth: getDateOfBirth({ dayOfBirth, monthOfBirth, yearOfBirth }),
    });
  };
  return (
    <Space direction="vertical">
      <h2>Список пользователей</h2>
      {users.map((user) => (
        <div key={user.id}>
          <Form
            onSubmit={handleUpdateUser}
            initialValues={{
              ...user,
              dayOfBirth: dayjs(user.dateOfBirth),
              monthOfBirth: dayjs(user.dateOfBirth),
              yearOfBirth: dayjs(user.dateOfBirth),
              phone: user.phone
                ? user.phone.slice(2, user.phone.length)
                : undefined,
            }}
          >
            {({ handleSubmit, submitting, form, ...rest }) => (
              <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
                <Space direction="vertical">
                  <Field
                    name="fullName"
                    component="input"
                    type="text"
                    placeholder="Full Name"
                    validate={(value) =>
                      !value
                        ? 'Введите ФИО'
                        : value.length > 100
                        ? 'ФИО не должно превышать 100 символов'
                        : undefined
                    }
                  >
                    {({ input, meta }) => (
                      <Space.Compact
                        direction="vertical"
                        style={{ width: '100%' }}
                      >
                        <Input
                          {...input}
                          addonBefore="Full Name"
                          size="large"
                          status={meta.touched && !!meta.error ? 'error' : ''}
                          style={{ marginBottom: '4px' }}
                        />
                        {meta.touched && !!meta.error && (
                          <Alert message={meta.error} type="error" showIcon />
                        )}
                      </Space.Compact>
                    )}
                  </Field>

                  <Space.Compact block>
                    <Field
                      name="dayOfBirth"
                      component="input"
                      type="hidden"
                      validate={(value) =>
                        !value ? 'Выберите день рождения' : undefined
                      }
                    >
                      {({ input, meta }) => (
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <DatePicker
                            {...input}
                            style={{ width: '100%' }}
                            picker="date"
                            format="DD"
                            allowClear={false}
                            size="small"
                            status={meta.touched && !!meta.error ? 'error' : ''}
                          />
                          {meta.touched && !!meta.error && (
                            <Alert message={meta.error} type="error" showIcon />
                          )}
                        </Space>
                      )}
                    </Field>
                    <Field
                      name="monthOfBirth"
                      component="input"
                      type="hidden"
                      validate={(value) =>
                        !value ? 'Выберите месяц рождения' : undefined
                      }
                    >
                      {({ input, meta }) => (
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <DatePicker
                            {...input}
                            style={{ width: '100%' }}
                            picker="month"
                            format="MMM"
                            allowClear={false}
                            size="large"
                            status={meta.touched && !!meta.error ? 'error' : ''}
                          />
                          {meta.touched && !!meta.error && (
                            <Alert message={meta.error} type="error" showIcon />
                          )}
                        </Space>
                      )}
                    </Field>
                    <Field
                      name="yearOfBirth"
                      component="input"
                      type="hidden"
                      validate={(value) =>
                        !value ? 'Выберите год рождения' : undefined
                      }
                    >
                      {({ input, meta }) => (
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <DatePicker
                            {...input}
                            style={{ width: '100%' }}
                            picker="year"
                            format="YYYY"
                            disabledDate={disabledDate}
                            allowClear={false}
                            size="large"
                            status={meta.touched && !!meta.error ? 'error' : ''}
                          />
                          {meta.touched && !!meta.error && (
                            <Alert message={meta.error} type="error" showIcon />
                          )}
                        </Space>
                      )}
                    </Field>
                  </Space.Compact>
                  <Space.Compact block>
                    <Field
                      name="address"
                      component="input"
                      type="text"
                      placeholder="Address"
                    >
                      {({ input }) => (
                        <Input addonBefore="Address" size="large" {...input} />
                      )}
                    </Field>
                  </Space.Compact>
                  <Space.Compact block>
                    <Field
                      name="city"
                      component="input"
                      type="text"
                      placeholder="City"
                    >
                      {({ input }) => (
                        <Input
                          {...input}
                          addonBefore="City"
                          size="large"
                          className="mb-3"
                        />
                      )}
                    </Field>
                  </Space.Compact>
                  <div>
                    <Field
                      name="phone"
                      component="input"
                      type="text"
                      parse={onlyNumbers}
                      validate={(v) =>
                        v && v.length < 12
                          ? 'Введите валидный номер телефона'
                          : undefined
                      }
                    >
                      {({ input, meta }) => (
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Input {...input} prefix="+7" />
                          {meta.submitFailed && !!meta.error && (
                            <Alert message={meta.error} type="error" showIcon />
                          )}
                        </Space>
                      )}
                    </Field>
                  </div>
                  <Space direction="horizontal">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={form.submit}
                    >
                      Обновить данные
                    </Button>
                    <Button
                      type="primary"
                      danger
                      ghost
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Удалить пользователя
                    </Button>
                  </Space>
                </Space>
              </form>
            )}
          </Form>
        </div>
      ))}
    </Space>
  );
};

export default UserList;
