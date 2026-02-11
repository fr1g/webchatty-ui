import { ArrowLeftIcon } from "tdesign-icons-react"



export default function Settings({navGoBack}: {navGoBack: Function}){


    return <div className="space-y-1.5">
        <div className="flex gap-3 items-center block-shadow border-button" onClick={() => navGoBack()}>
            <ArrowLeftIcon className="block ml-1" />
            <p>Go Back</p>
        </div>
        <h3 className="text-xl font-semibold my-1">Settings</h3>
    </div>
}