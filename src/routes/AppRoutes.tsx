import { Route, Routes } from "react-router-dom";
import Tasks from "@/pages/Tasks/Tasks.tsx";
import Home from "@/pages/Home/Home.tsx";
import Designers from "@/pages/Designers/Designers.tsx";
import {ROUTES} from "@/shared/routes.config.ts";
import styles from "./styles.module.scss"


function AppRoutes() {
    return (
        <div className={styles.main}>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />}/>
                <Route path={ROUTES.TASKS} element={<Tasks />}/>
                <Route path={ROUTES.DESIGNERS} element={<Designers />}/>
            </Routes>
        </div>
    );
}
export default AppRoutes;
