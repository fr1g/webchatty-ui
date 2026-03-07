import { ArrowLeftIcon, SearchIcon } from "tdesign-icons-react";
import NavList, { type NavListItem } from "../../comps/NavList";
import { Input } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { AvataredNavListItemFactory } from "../../comps/AvataredListItem";
import { ReusableFuncs } from "../../main";


export default function Contacts({ navGoBack }: { navGoBack: Function }) {

    const [searching, setSearching] = useState(false);
    const [mock, setMock] = useState<NavListItem[]>([]);

    const reuses = useContext(ReusableFuncs);

    useEffect(() => {
        if (reuses == null) return;
        setMock([
            // 可优化：通过状态管理或context将最近聊天存在内存中，方便复用聊天对象的头像和昵称
            AvataredNavListItemFactory({ name: "Bill Herry", jumper: () => { reuses.setChat("here-goes-chat-unique-id::001mock") } }, "Bio 其实就相当于QQ里面的个性签名"),
            AvataredNavListItemFactory({ name: "He Yao", jumper: () => { reuses.setChat("here-goes-chat-unique-id::002mock") } }, "所以通讯录里面这里写bio非常合理"),
            AvataredNavListItemFactory({ name: "Andrei Xyx", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "在线·当然可以用模板方法在开头添加这种在线状态"),
        ]);
    }, [reuses]);

    return <div className="space-y-1.5">
        <div className="hidden sm:flex gap-3 items-center block-shadow border-button" onClick={() => navGoBack()}>
            <ArrowLeftIcon className="block ml-1" />
            <p>Go Back</p>
        </div>
        <h3 className="text-xl font-semibold my-1">Contacts</h3>
        <div className="relative mb-3">
            <div className={`grid items-center border-button border-0! z-10 absolute left-0.5 top-0 bottom-0  ${searching ? 'opacity-15!' : 'opacity-100!'}`}>
                <SearchIcon fillColor='transparent' size='large' strokeColor='currentColor' strokeWidth={2} />
            </div>
            <Input placeholder={searching ? 'Search recents...' : ''} onFocus={() => setSearching(true)} onBlur={() => setSearching(false)} className={`w-full block-shadow h-8 rounded-lg px-1 interactive outline-0`} />
        </div>
        <NavList items={mock} />
    </div>
}