import { useContext } from "react";
import { ChevronLeftIcon } from "tdesign-icons-react";
import { ReusableFuncs } from "../main";



export default function NewFriend() {
    const reuses = useContext(ReusableFuncs);


    return <div className="h-full w-full p-1.5 overflow-hidden flex flex-col gap-1">
        <div className="flex gap-3">
            <div onClick={() => reuses?.goHome()} className="border-button grid size-full items-center justify-items-center sm:hidden aspect-square w-fit">
                <ChevronLeftIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
            </div>
            <h1 className="font-semibold text-3xl text-shadow-sm text-shadow-slate-500/20 grow fade-in">
                New Friend
            </h1>
        </div>
        <div>
            在这里搜索或批准好友申请。也可以使用modal自定义组件插入
        </div>
    </div>
}