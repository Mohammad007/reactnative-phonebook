import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phonebook: [],
};

export const PhonebookSlice = createSlice({
  name: "phonebooks",
  initialState,
  reducers: {
      setPhonebooks: (state, action) => {
          state.phonebook = [...state.phonebook, action.payload];
          // sorte the data
        //   state.phonebook.sort((a, b) => {
        //         return a.fullName.localeCompare(b.fullName);
        //   });
          
      },
      deletePhonebook: (state, action) => {
            state.phonebook = state.phonebook.filter(
                (phonebook) => phonebook.id !== action.payload
            );
        },
      updatePhonebook: (state, action) => {
            state.phonebook = state.phonebook.map((phonebook) => {
                if (phonebook.id === action.payload.id) {
                    return action.payload;
                }
                return phonebook;
            });
      }
  },
});

// Action creators are generated for each case reducer function
export const { setPhonebooks, deletePhonebook, updatePhonebook } = PhonebookSlice.actions;

export default PhonebookSlice.reducer;
