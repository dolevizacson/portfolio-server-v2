import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { contactFormDefaultValue } from '../common/constants/forms-default-values';
import { CreateMail } from '../common/interfaces/create-mail.interface';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: contactFormDefaultValue,
  reducers: {
    persistContact(state, action: PayloadAction<CreateMail>) {
      return action.payload;
    },
  },
});

export const { persistContact } = contactSlice.actions;
