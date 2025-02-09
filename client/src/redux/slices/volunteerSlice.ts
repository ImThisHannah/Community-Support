import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Volunteer {
  name: any;
  _id: string;
  user: string;
  skills: string;
  availability: string;
  location: {
    coordinates: [number, number];
  };
}

interface VolunteerState {
  list: Volunteer[];
}

const initialState: VolunteerState = {
  list: [],
};

const volunteerSlice = createSlice({
  name: 'volunteers',
  initialState,
  reducers: {
    setVolunteers: (state, action: PayloadAction<Volunteer[]>) => {
      state.list = action.payload;
    },
    addVolunteer: (state, action: PayloadAction<Volunteer>) => {
      state.list.push(action.payload);
    },
  },
});

export const { setVolunteers, addVolunteer } = volunteerSlice.actions;
export default volunteerSlice.reducer;
