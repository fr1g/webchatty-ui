import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, type ReactNode } from 'react'

export class DialogInfo {
    approveCall: Function;
    approveOpt?: string;
    content: string;
    title: string;

    constructor(
        content: string,
        title: string,
        approveCall: Function,
        approveOpt?: string
    ) {
        this.approveCall = approveCall
        this.approveOpt = approveOpt
        this.content = content
        this.title = title
    }
}

export default function Modal({ children, activated = false, info, shut }: { children?: ReactNode, activated: boolean, info: DialogInfo, shut: Function }) {

    function continueOpt() {
        info.approveCall();
        shut();
    }

    return <Dialog open={activated} onClose={() => shut()} className="relative z-50" >
        <div className="fixed inset-0 flex w-screen items-center justify-center" id='MODAL_DIALOG'>
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                <DialogTitle className="font-bold">{info.title}</DialogTitle>
                <Description>
                    {children ?? info.content}
                </Description>
                <div className="flex gap-4">
                    <button id='MODAL___SHUT' onClick={() => shut()}>Cancel</button>
                    {
                        info.approveOpt && <button onClick={() => continueOpt()}>{info.approveOpt}</button>
                    }
                </div>
            </DialogPanel>
        </div>
    </Dialog>
}

export function ClickCloseModal() {
    document.getElementById('MODAL___SHUT')!.click();
}