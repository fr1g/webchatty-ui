import NavList, { type NavListItem } from "../../comps/NavList";


export default function Contacts() {

    const mock: NavListItem[] = [

    ];

    return <div>
        contacts
        <div>back</div>
        <hr />

        <NavList items={mock} />
    </div>
}