import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Resource {
  _id: string;
  name: string;
  type: string;
  location: {
    coordinates: [number, number];
  };
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

interface ResourceState {
  list: Resource[];
}

const initialState: ResourceState = {
  list: [],
};

const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setResources: (state, action: PayloadAction<Resource[]>) => {
      state.list = action.payload;
    },
    addResource: (state, action: PayloadAction<Resource>) => {
      state.list.push(action.payload);
    },
  },
});

export const { setResources, addResource } = resourceSlice.actions;
export default resourceSlice.reducer;
