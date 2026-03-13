import { useParams } from "react-router";
import ClickableAvatar from "../comps/ClickableAvatar";
import { useContext, useEffect } from "react";
import { ChatMessageIcon, ChevronLeftIcon, ViewListIcon } from "tdesign-icons-react";
import { ReusableFuncs, type ModalControl } from "../main";
import type { DialogInfo } from "../comps/Modal";




export default function UserView() {
    const reuses = useContext(ReusableFuncs);
    const { userId } = useParams();

    useEffect(() => {
        // get userInfo
    }, []);

    function showContactOperationModal() {
        reuses?.modalUpdate({
            info: {
                approveCall: () => { },
                approveOpt: undefined,
                title: "Contact Operation",
                content: "-"
            } as DialogInfo,
            showing: true,
            customChildren: <div>
                operations here.
            </div>
        } as ModalControl);
    }

    return <div className="grid items-center justify-items-center h-full overflow-x-hidden overflow-y-auto relative">
        <div onClick={() => reuses?.goHome()} className="absolute top-0 left-0 border-button flex size-fit items-center justify-items-center sm:hidden">
            <ChevronLeftIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
            <div className="pr-1.5">Back</div>
        </div>
        <div className="min-w-1/3 max-w-125 p-1.5 grid justify-items-center gap-1.5">
            <ClickableAvatar className="size-20! shadow-lg!" />
            <h2 className="text-center font-semibold text-xl my-1">Name Surname</h2>
            <p className="text-xs/1 opacity-70">{userId}</p>
            <p className="text-center font-serif my-1 border-t border-b py-1 border-slate-500/50">
                <span className="italic font-light opacity-70">Bio:</span>
                This is a lorem ipsulm dolor sit amet bio text showing here. A bio should have a max-limit at backend.
            </p>
            <table className="table-auto w-full comparasive">
                <tbody>
                    <tr>
                        <td>Gender</td>
                        <td className="// or hidden? or Male">Female</td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td>2004/04/04</td>
                    </tr>
                    <tr>
                        <td>EMail</td>
                        <td>none</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>+7 990 815 33 27</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-1.5 p-3 w-full sm:w-fit sm:left-auto // can actually use _flex">
            <div onClick={() => showContactOperationModal()} className="border-button flex gap-1 px-3! justify-center  items-center">
                <ViewListIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                <p>Options</p>
            </div>
            <div onClick={() => reuses?.setChat("chatId")} className="border-button flex gap-1 px-3! justify-center  items-center">
                <ChatMessageIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                <p>Chat</p>
            </div>
        </div>
    </div>
}