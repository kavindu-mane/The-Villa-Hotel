// types for validation error
export type errorTypes = {
  email?: string[];
  password?: string[];
  name?: string[];
  repeat_password?: string[];
  message?: string;
  remark?: string[];
  phone?: string[];
  table?: string[];
  menu?: string[];
  date?: string[];
  time_slot?: string[];
};

// types for menu selection
export type menuSelectionTypes = {
  id: number;
  qty: number;
};
