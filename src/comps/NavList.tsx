import { useState, type ReactNode } from "react";

export interface NavListItem { name: string; jumper: Function; customNode?: ReactNode }


export default function NavList({ items, tight = false }: { items: NavListItem[], tight?: boolean }) {
    const [select, setSelect] = useState<null | NavListItem>(null);
    const doSelect = (func: Function, sel: NavListItem) => {
        setSelect(sel);
        func();
    }
    return <ul className={`h-full w-full shadow rounded-lg ${tight ? 'use-tight-list' : 'space-y-1'}`}>
        {items.map((i: NavListItem) => {
            return <li key={i.name} onClick={() => doSelect(i.jumper, i)}
                className={`${i.customNode ? '' : 'p-3'} ${tight ? 'tight-item' : 'rounded-lg'} hover:shadow ${i.name == select?.name ? 'bg-slate-200/30!' : ''} bg-transparent hover:bg-slate-200/40 dark:hover:bg-slate-400/50 active:bg-slate-500/55 dark:active:bg-slate-400`}>
                {
                    i.customNode ?? <p>
                        {i.name}
                    </p>
                }
            </li>
        })}
    </ul>
}