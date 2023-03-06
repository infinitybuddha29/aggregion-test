import formatString from 'format-string-by-pattern';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { DateOfBirth } from './types';

export const onlyNumbers = (phone: string): string => {
  const onlyNumbers = phone.replace(/[^\d]/g, '');
  return formatString('999-999-9999', onlyNumbers);
};

export const disabledDate: RangePickerProps['disabledDate'] = (
  current: Dayjs
): boolean => {
  return current && current > dayjs().endOf('year');
};

export const getDateOfBirth = ({
  dayOfBirth,
  monthOfBirth,
  yearOfBirth,
}: DateOfBirth): string => {
  const day = Number(dayjs(dayOfBirth).format('DD'));
  const month = Number(dayjs(monthOfBirth).format('MM'));
  const year = Number(dayjs(yearOfBirth).format('YYYY'));
  return new Date(year, month - 1, day, 0, 0, 0, 0).toDateString();
};
