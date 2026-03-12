import { useContext, useState, useEffect } from "react";
import { LogoutIcon } from "tdesign-icons-react";
import type { DialogInfo } from "../../comps/Modal";
import NavList, { type NavListItem } from "../../comps/NavList";
import SettingsListItem from "../../comps/SettingsListItem";
import { ReusableFuncs, type ModalControl } from "../../main";
import SettingsLayout from "./SettingsLayout";


export default function PrivacySettings() {

    const reuses = useContext(ReusableFuncs);
    const [items, setItems] = useState<NavListItem[]>([]);

    useEffect(() => {
        if (reuses)
            setItems([
                ({
                    name: "Example",
                    customNode: <SettingsListItem
                        left={"Example"}
                        right={<LogoutIcon fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />}
                    />,
                    jumper: () => {
                        console.log("call")
                        reuses.modalUpdate({
                            info: {
                                title: "Modal",
                                content: "modal content not showing if have children",
                            } as DialogInfo,
                            showing: true,
                            customChildren: <div>
                                hello
                            </div>
                        } as ModalControl);
                    }
                }) as NavListItem]);
    }, [reuses]);

    return <SettingsLayout title="Privacy" explain="Manage your way to be discovered and info visibilities." >
        <NavList items={items} tight />
    </SettingsLayout>
}