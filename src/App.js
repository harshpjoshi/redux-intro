import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";
import store from "./Store";

function App() {
  const customer = useSelector((state) => state.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      {customer !== "" ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : null}
    </div>
  );
}

export default App;
