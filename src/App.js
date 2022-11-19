import { Amplify } from "aws-amplify";
import { Route, Routes } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { styled } from "@mui/material/styles";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { FormsList } from "./pages/FormsList";
import { ProductionForm } from "./forms/ProductionForm";
import { FormsContextProvider } from "./contexts/FormsContext";

Amplify.configure(awsExports);

const LayoutContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: theme.spacing(12),
}));

function App({ signOut, user }) {
  console.log(user);
  return (
    <div>
      <FormsContextProvider>
        <NavBar user={user} signOut={signOut} />
        <LayoutContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<Profile user={user} signOut={signOut} />}
            />
            <Route path="/forms" element={<FormsList />} />
            <Route path="/production-form" element={<ProductionForm />} />
          </Routes>
        </LayoutContainer>
      </FormsContextProvider>
    </div>
  );
}

export default withAuthenticator(App);
