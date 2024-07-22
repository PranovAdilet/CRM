import { TFunction } from 'i18next';
import {ROUTES} from "@/shared/routes.config.ts";
import {LayoutDashboard, LayoutList, UserPen} from "lucide-react";


export const navbarMenu = (t: TFunction) => [
    {
        label: t("navbar.menu.dashboard"),
        Icon: LayoutDashboard,
        route: ROUTES.HOME,
    },
    {
        label: t("navbar.menu.tasks"),
        Icon: LayoutList,
        route: ROUTES.TASKS,
    },
    {
        label: t("navbar.menu.designer"),
        Icon: UserPen,
        route: ROUTES.DESIGNERS,
    },
];