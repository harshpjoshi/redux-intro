import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(ammount, purpose) {
        return { payload: { ammount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.ammount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.ammount;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

console.log(requestLoan(1000, "test"));

export default accountSlice.reducer;

export function deposit(ammount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: ammount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${ammount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       // LATER
//       return {
//         ...state,
//         loan: action.payload.ammount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.ammount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(ammount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: ammount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     const host = "api.frankfurter.app";
//     const res = await fetch(
//       `https://${host}/latest?amount=${ammount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     console.log(data);
//     const converted = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }

// export function withdraw(ammount) {
//   return { type: "account/withdraw", payload: ammount };
// }

// export function requestLoan(ammount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { ammount: ammount, purpose: purpose },
//   };
// }

// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }
