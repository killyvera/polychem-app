// import { useContext } from "react";
// import { FormsContext } from "../../contexts/FormsContext";

// Components
import { UsersForm } from "../UsersForm";
import NavigationButton from "../NavigationButton";

export default function EmployeeStaff({ productId }) {
  // const { rawMaterialsList } = useContext(FormsContext);

  return (
    <>
      <UsersForm />

      <NavigationButton
        path={`/packaging/${productId}`}
        text="Ready to Production"
      />
    </>
  );
}
