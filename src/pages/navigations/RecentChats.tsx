import { Input } from "@headlessui/react";
import NavList, { type NavListItem } from "../../comps/NavList";
import { SearchIcon, UserListIcon } from "tdesign-icons-react";
import { useState } from "react";
import AvataredListItem, { AvataredNavListItemFactory } from "../../comps/AvataredListItem";


export default function RecentChats({gotoContacts}:{gotoContacts: Function}) {
    // getting recent chats via context
    const mock: NavListItem[] = [
        AvataredNavListItemFactory({name: "Bill Herry", jumper: () => {}}, "Hello there"),
        AvataredNavListItemFactory({name: "He Yao", jumper: () => {}}, "owo :)"),
        AvataredNavListItemFactory({name: "Andrei Xyx", jumper: () => {}}, "Czesc!!! I'm your polanski guy :)"),
    ];

    const [searching, setSearching] = useState(false);
    return <div>
        <div className="relative mb-3">
            <div className={`grid items-center border-button border-0! z-10 absolute left-0.5 top-0 bottom-0  ${searching ? 'opacity-15!' : 'opacity-100!'}`}>
                <SearchIcon fillColor='transparent' size='large' strokeColor='currentColor' strokeWidth={2} />
            </div>
            <Input placeholder={searching ? 'Search recents...' : ''} onFocus={() => setSearching(true)} onBlur={() => setSearching(false)} className={`w-full block-shadow h-8 rounded-lg px-1 interactive outline-0`} />
            <div onClick={() => gotoContacts()} className={`items-center hidden border-button z-10 absolute right-0 top-0 bottom-0 sm:grid ${searching ? 'opacity-15! hover:opacity-50!' : 'opacity-100!'}`}>
                <UserListIcon fillColor='transparent' size='large' className='block' strokeColor='currentColor' strokeWidth={2} />
            </div>
        </div>
        <NavList items={mock} tight />
    </div>
}