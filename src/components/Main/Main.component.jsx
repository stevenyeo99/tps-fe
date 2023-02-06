import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard.component";

import { selectCurrentUser } from "../../store/user/user.selector";

const Main = (props) => {
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) {
        return <Navigate to='/auth' />;
    } else {
        return <Dashboard />
    }
};

export default Main;