import { ArrowLeftIcon, SearchIcon } from "tdesign-icons-react";
import NavList, { type NavListItem } from "../../comps/NavList";
import { Input } from "@headlessui/react";
import { useState } from "react";


export default function Contacts({ navGoBack }: { navGoBack: Function }) {

    const [searching, setSearching] = useState(false);

    const mock: NavListItem[] = [

    ];

    return <div className="space-y-1.5">
        <div className="flex gap-3 items-center block-shadow border-button" onClick={() => navGoBack()}>
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