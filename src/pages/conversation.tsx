import { useContext, useEffect, useRef, useState } from "react";
import Bubble from "../comps/Bubble";
import { useParams } from "react-router";
import { ReusableFuncs, type ModalControl } from "../main";
import { ChevronLeftIcon, SendIcon } from "tdesign-icons-react";
import ClickableAvatar from "../comps/ClickableAvatar";


export function Conversation() {
    const [chatStack, setChatStack] = useState<Array<string>>([]);
    const { chatId } = useParams();
    const reuses = useContext(ReusableFuncs);

    const chatArea = useRef(null);
    const input = useRef(null);
    const send = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (chatStack.length < 18) setChatStack(_ => [..._, `${_.length}`]);
        }, 1500);
    });

    useEffect(() => {
        if (input) {

        }
    }, [input])

    useEffect(() => {
        if (chatArea.current) {
            let n = (chatArea.current as HTMLDivElement);
            n.scrollTo({ top: n.scrollHeight, behavior: 'smooth' });
        }
        console.log(chatStack)
    }, [chatStack, chatArea]);

    const [text, setText] = useState<null | string>(null);
    const updateInput = (val: string) => {
        // const trimmed = val.trimStart();
        const trimmed = val;
        if (trimmed.length <= 0) setText(null);
        setText(trimmed);
        console.log("trimmed", trimmed, trimmed.length)
    }

    function chatInfoModal() {
        const mock = {
            name: 'Andrzej',
            uuid: 'user-unique-identification-goes-here',
            avatar: '...',
            bio: 'This is a bio. Tak.',

        }; // 假设这是用户当前聊天对象的基础信息
        const modalContent = {
            info: {
                approveOpt: 'Contact', // 查看对方的contact
                approveCall: () => {
                    reuses?.setUserView(mock.uuid); // 使用对方的id跳转
                },
                content: chatId,
                title: `Chat with ${mock.name}` // 这里写对话对象的昵称
            },
            customChildren: <div className="grid grid-cols-3 justify-between gap-1">

                <div>Chat ID</div><div className="col-span-2">{chatId}</div>

                <div>Friend's Bio</div><div className="col-span-2">{mock.bio}</div>

                <div>Friend's UUID</div><div className="col-span-2">{mock.uuid}</div>

            </div>, showing: true
        } as ModalControl;
        reuses?.modalUpdate(modalContent);
    }

    if (chatId) return <>
        <div className=" size-full flex flex-col relative">
            <div className=" flex rounded-lg bg-slate-100 dark:bg-slate-600 items-center gap-1.5 p-2 shadow-md z-1">
                <div onClick={() => reuses?.goHome()} className="border-button grid items-center justify-items-center sm:hidden aspect-square">
                    <ChevronLeftIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                </div>
                <div className="grow">
                    <h3 className="text-lg font-semibold text-nowrap max-w-[56vw] sm:max-w-[66vw] text-ellipsis overflow-hidden">昵称</h3>
                    <h5 className="text-sm/4 text-nowrap max-w-[56vw] sm:max-w-[66vw] text-ellipsis overflow-hidden">此处可以写bio和在线状态: {chatId}</h5>
                </div>
                <ClickableAvatar url={undefined} onClick={() => chatInfoModal()} className="" />
            </div>
            <div ref={chatArea} className="flex-col-reverse flex rounded-lg grow h-full overflow-x-hidden overflow-y-scroll py-3 relative">
                {[...chatStack].reverse().map((msg) => {
                    let tryparse = parseFloat(msg); // 临时的预览逻辑
                    return <Bubble message={`${msg}`} opposite={!isNaN(tryparse) && (tryparse % 2 == 0)} key={msg} extras="2026/mar/7-10:24" />
                })}
            </div>
            <div className="w-full min-h-14 text-sm sm:min-h-20 sm:text-base flex gap-1.5 sm:gap-3 mt-1  bottom-0 left-0 right-0">
                <textarea
                    onKeyUp={(e) => {
                        if (e.key.toLowerCase() != 'enter') return;
                        else if (e.key.toLowerCase() == 'enter' && e.shiftKey) return;
                        else if (send.current && text) (send.current as HTMLDivElement).click();
                    }}
                    onChange={(e) => updateInput(e.target.value)}
                    value={text ?? ""}
                    ref={input}
                    style={{ resize: 'none' }}
                    name="textingbox"
                    id="txt"
                    className=" rounded-lg size-full grow focus:outline-2 
                    focus:outline-slate-400 shadow-md bg-slate-100/80 
                    dark:bg-slate-800/50 p-1.5"
                    enterKeyHint="send"
                ></textarea>
                <div ref={send}
                    className={`
                        ${text == null ? 'bg-gray-300/80 cursor-not-allowed! pointer-events-none' : 'bg-blue-400/50 hover:bg-blue-400/75 active:bg-blue-300/45'}
                     grid shadow-md items-center justify-items-center rounded-lg  aspect-square
                    `} onClick={() => {
                        if (text) { // 或者只需要判断发送内容是不是纯空格，或者干脆不判断
                            setChatStack(_ => [..._, text.trim()]);
                        }
                        setText(null);
                        if (input.current) (input.current as HTMLTextAreaElement).value = "";

                    }}>
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