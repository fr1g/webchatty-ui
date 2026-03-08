import { useContext, useEffect, useRef, useState } from "react";
import Bubble from "../comps/Bubble";
import { useParams } from "react-router";
import { ReusableFuncs } from "../main";
import { ChevronLeftIcon, SendIcon } from "tdesign-icons-react";
import ClickableAvatar from "../comps/ClickableAvatar";


export function Conversation() {
    const [chatStack, setChatStack] = useState<Array<number>>([]);
    const { chatId } = useParams();
    const reuses = useContext(ReusableFuncs);

    const chatArea = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            if (chatStack.length < 18) setChatStack(_ => [..._, _.length]);
        }, 1500);
    });

    useEffect(() => {
        if (chatArea.current) {
            let n = (chatArea.current as HTMLDivElement);
            n.scrollTo({ top: n.scrollHeight, behavior: 'smooth' });
        }
    }, [chatStack, chatArea]);

    if (chatId) return <>
        <div className=" size-full flex flex-col relative">
            <div className="-translate-y-0.5 flex rounded-lg bg-slate-100 dark:bg-slate-600 items-center gap-1.5 p-2 shadow-md">
                <div onClick={() => reuses?.goHome()} className="border-button grid items-center justify-items-center sm:hidden aspect-square">
                    <ChevronLeftIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                </div>
                <div className="grow">
                    <h3 className="text-lg font-semibold text-nowrap max-w-[56vw] sm:max-w-[66vw] text-ellipsis overflow-hidden">昵称</h3>
                    <h5 className="text-sm/4 text-nowrap max-w-[56vw] sm:max-w-[66vw] text-ellipsis overflow-hidden">此处可以写bio和在线状态: {chatId}</h5>
                </div>
                <ClickableAvatar className="" />
            </div>
            <div ref={chatArea} className="flex-col-reverse flex grow h-full overflow-x-hidden overflow-y-scroll py-3">
                {[...chatStack].reverse().map((msg) => {
                    return <Bubble message={`${msg}`} opposite={msg % 2 == 0} key={msg} extras="2026/mar/7-10:24" />
                })}
            </div>
            <div className="w-full min-h-12 flex gap-1.5 sm:gap-3 mt-1  bottom-0 left-0 right-0">
                <textarea style={{ resize: 'none' }} name="textingbox" id="txt" className=" rounded-lg size-full grow focus:outline-2 focus:outline-slate-400 shadow-md bg-slate-100/80 dark:bg-slate-800/50 p-1.5"></textarea>
                <div className="bg-blue-400/50 hover:bg-blue-400/75 active:bg-blue-300/45 grid shadow-md items-center justify-items-center rounded-lg  aspect-square">
                    <SendIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                </div>
            </div>
        </div>

    </>
    return <div className="w-full h-full">
        <p className="text-center my-auto">
            Select a chat...
        </p>
    </div>
}