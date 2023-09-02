import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const accountSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID, createdAt) {
        return { payload: { fullName, nationalID, createdAt } };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = accountSlice.actions;

export default accountSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullname,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullname, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullname, nationalID, createdAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullname) {
//   return {
//     type: "customer/updateName",
//     payload: fullname,
//   };
// }
