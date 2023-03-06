import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { Input, DatePicker, Space, Button } from 'antd';
import { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { onlyNumbers, disabledDate, getDateOfBirth } from './utils';
import { Typography, Tag } from 'antd';
import { User } from './types';

const { Title } = Typography;

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialValues?: User;
}

type onSubmitHandleType = {
  fullName: string;
  address?: string;
  city?: string;
  phone?: string;
  dayOfBirth: Dayjs;
  yearOfBirth: Dayjs;
  monthOfBirth: Dayjs;
};

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialValues }) => {
  const onSubmitHandle = ({
    fullName,
    address,
    city,
    phone,
    dayOfBirth,
    yearOfBirth,
    monthOfBirth,
  }: onSubmitHandleType) => {
    onSubmit({
      id: uuidv4(),
      fullName,
      address,
      city,
      phone: phone ? `+7${phone}` : undefined,
      dateOfBirth: getDateOfBirth({ dayOfBirth, monthOfBirth, yearOfBirth }),
    });
  };
  return (
    <Fragment>
      <Title>Регистрация пользователя</Title>
      <Form onSubmit={onSubmitHandle} initialValues={initialValues}>
        {({ handleSubmit, submitting, form, ...rest }) => (
          <form onSubmit={handleSubmit}>
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
                  <Space.Compact direction="vertical" style={{ width: '100%' }}>
                    <Input
                      {...input}
                      addonBefore="Full Name"
                      size="large"
                      status={meta.touched && !!meta.error ? 'error' : ''}
                      style={{ marginBottom: '4px' }}
                    />
                    {meta.touched && !!meta.error && (
                      <Tag color="red" style={{ width: '100%' }}>
                        {meta.error}
                      </Tag>
                    )}
                  </Space.Compact>
                )}
              </Field>

              <Space.Compact block>
                <Field
                  name="dayOfBirth"
                  component="input"
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
                        <Tag color="red">{meta.error}</Tag>
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
                        <Tag color="red">{meta.error}</Tag>
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
                        <Tag color="red">{meta.error}</Tag>
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
                      <Input
                        {...input}
                        prefix="+7"
                        status={meta.touched && !!meta.error ? 'error' : ''}
                      />
                      {meta.touched && !!meta.error && (
                        <Tag color="red" style={{ width: '100%' }}>
                          {meta.error}
                        </Tag>
                      )}
                    </Space>
                  )}
                </Field>
              </div>
              <div>
                <Button type="primary" htmlType="submit" disabled={submitting}>
                  Отправить
                </Button>
              </div>
            </Space>
          </form>
        )}
      </Form>
    </Fragment>
  );
};

export default UserForm;
