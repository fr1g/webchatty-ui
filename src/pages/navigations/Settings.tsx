import { useContext, useState, useEffect } from "react";
import { ArrowLeftIcon } from "tdesign-icons-react"
import { AvataredNavListItemFactory } from "../../comps/AvataredListItem";
import { ReusableFuncs } from "../../main";
import NavList from "../../comps/NavList";
import type { NavListItem } from "../../comps/NavList";



export default function Settings({ navGoBack }: { navGoBack: Function }) {
    const reuses = useContext(ReusableFuncs);
    const [mock, setMock] = useState<NavListItem[]>([]);

    useEffect(() => {
        if (reuses == null) return;
        setMock([
            // 可优化：通过状态管理或context将最近聊天存在内存中，方便复用聊天对象的头像和昵称
            ({ name: "General", jumper: () => { reuses.setSettings("general") } }) as NavListItem,
            ({ name: "Privacy", jumper: () => { reuses.setSettings("privacy") } }) as NavListItem,
            ({ name: "Profile", jumper: () => { reuses.setSettings("profile") } }) as NavListItem,
        ]);
    }, [reuses]);

    return <div className="space-y-1.5">
        <div className="hidden sm:flex gap-3 items-center block-shadow border-button" onClick={() => navGoBack()}>
            <ArrowLeftIcon className="block ml-1" />
            <p>Go Back</p>
        </div>
        <h3 className="text-xl font-semibold my-1">Settings</h3>
        <NavList items={mock} />

    </div>
}