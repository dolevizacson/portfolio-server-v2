import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppColor } from '../common/interfaces/app-color.interface';
import { appColor1 } from '../style/app-colors';

export const appColorSlice = createSlice({
  name: 'appColors',
  initialState: appColor1,
  reducers: {
    setAppColors(state, action: PayloadAction<AppColor>) {
      return action.payload;
    },
  },
});

export const { setAppColors } = appColorSlice.actions;
