import { Dayjs } from 'dayjs';

export type DateOfBirth = {
  dayOfBirth: Dayjs;
  monthOfBirth: Dayjs;
  yearOfBirth: Dayjs;
};
export type User = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  address?: string;
  city?: string;
  phone?: string;
};
