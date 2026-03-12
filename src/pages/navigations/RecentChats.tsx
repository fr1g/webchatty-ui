import { Input } from "@headlessui/react";
import NavList, { type NavListItem } from "../../comps/NavList";
import { SearchIcon, UserListIcon } from "tdesign-icons-react";
import { useContext, useEffect, useState } from "react";
import AvataredListItem, { AvataredNavListItemFactory } from "../../comps/AvataredListItem";
import { ReusableFuncs } from "../../main";


export default function RecentChats({ gotoContacts }: { gotoContacts: Function }) {
    // getting recent chats via context
    const reuses = useContext(ReusableFuncs);
    const [mock, setMock] = useState<NavListItem[]>([]);

    useEffect(() => {
        if (reuses == null) return;
        setMock([
            // 可优化：通过状态管理或context将最近聊天存在内存中，方便复用聊天对象的头像和昵称
            AvataredNavListItemFactory({ name: "Bill Herry", jumper: () => { reuses.setChat("here-goes-chat-unique-id::001mock") } }, "Hello there"),
            AvataredNavListItemFactory({ name: "He Yao", jumper: () => { reuses.setChat("here-goes-chat-unique-id::002mock") } }, "owo :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 1", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 2", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 3", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 4", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 5", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 6", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 7", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 8", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
            AvataredNavListItemFactory({ name: "Andrei Xyx 9", jumper: () => { reuses.setChat("here-goes-chat-unique-id::003mock") } }, "Czesc!!! I'm your polanski guy :)"),
        ]);
    }, [reuses]);

    const [searching, setSearching] = useState(false);
    return <div className="max-h-full flex flex-col">
        <div className="relative mb-3">
            <div className={`grid items-center border-button border-0! z-10 absolute left-0.5 top-0 bottom-0  ${searching ? 'opacity-15!' : 'opacity-100!'}`}>
                <SearchIcon fillColor='transparent' size='large' strokeColor='currentColor' strokeWidth={2} />
            </div>
            <Input placeholder={searching ? 'Search recents...' : ''} onFocus={() => setSearching(true)} onBlur={() => setSearching(false)} className={`w-full block-shadow h-8 rounded-lg px-1 interactive outline-0`} />
            <div onClick={() => gotoContacts()} className={`items-center hidden border-button z-10 absolute right-0 top-0 bottom-0 sm:grid ${searching ? 'opacity-15! hover:opacity-50!' : 'opacity-100!'}`}>
                <UserListIcon fillColor='transparent' size='large' className='block' strokeColor='currentColor' strokeWidth={2} />
            </div>
        </div>
        <NavList items={mock} tight hintBottom />
    </div>
}