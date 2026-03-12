import { useContext, useState, useEffect } from "react";
import NavList, { type NavListItem } from "../../comps/NavList";
import { ReusableFuncs, type ModalControl } from "../../main";
import SettingsLayout from "./SettingsLayout";
import ColorModeSwitch from "../../comps/ColorModeSwitch";
import SettingsListItem from "../../comps/SettingsListItem";
import { InfoCircleIcon, LogoutIcon } from "tdesign-icons-react";
import type { DialogInfo } from "../../comps/Modal";



export default function GeneralSettings() {
    const reuses = useContext(ReusableFuncs);
    const [items, setItems] = useState<NavListItem[]>([]);


    useEffect(() => {
        if (reuses)
            setItems([
                ({
                    name: "Color Mode",
                    customNode: <SettingsListItem
                        left={"Color Mode"}
                        right={<ColorModeSwitch className="block my-auto" mgr={reuses.themeMgr} />}
                    />,
                    jumper: () => {
                        reuses.themeMgr.trigger();
                    }
                }) as NavListItem,
                ({
                    name: "Logoff",
                    customNode: <SettingsListItem
                        left={"Logoff"}
                        right={<LogoutIcon fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />}
                    />,
                    jumper: () => {
                        console.log("call")
                        reuses.modalUpdate({
                            info: {
                                approveCall: () => {
                                    alert("LogOffOperation");
                                },
                                approveOpt: "Yes",
                                title: "Logging off",
                                content: "Are you sure to log off? You will not able to access your contacts unless you log in again."
                            } as DialogInfo,
                            showing: true,
                            customChildren: undefined
                        } as ModalControl);
                    }
                }) as NavListItem,
                ({
                    name: "Clear Settings", // modal询问是否清空localStorage
                    customNode: <SettingsListItem
                        left={"Clear Settings"}
                        right={<LogoutIcon fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />}
                    />,
                    jumper: () => {

                    }
                }) as NavListItem,
                ({
                    name: "About",
                    customNode: <SettingsListItem
                        left="About"
                        right={<InfoCircleIcon fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />}
                    />,
                    jumper: () => {

                    }
                }) as NavListItem,
            ]);
    }, [reuses]);

    return <SettingsLayout title="General" explain="General settings of this web app. These settings will be saved in localStorage." >
        <NavList items={items} tight />
    </SettingsLayout>
}