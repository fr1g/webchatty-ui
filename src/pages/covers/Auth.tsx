import { useEffect, useState } from "react"
import { LoginIcon, AssignmentCheckedIcon, UserAddIcon } from "tdesign-icons-react";



export default function Auth() {
    const [page, setPage] = useState<"register" | "login">("login");
    function _setPage(page: "register" | "login") {
        setPage(page);
        window.history.pushState({}, "", `#${page}`);
    }
    useEffect(() => {
        if (window.location.hash == "#register") _setPage('register');
        else _setPage("login");
        window.addEventListener('hashchange', () => window.location.reload());
        return () => {
            window.removeEventListener('hashchange', () => window.location.reload());
        }
    }, []);


    if (page === 'register') return <div id="register" className="space-y-3.5 h-full flex flex-col">
        <h1 className="text-3xl font-bold">Register</h1>
        <form action="" className="grow"></form>

        <div className=" grid grid-cols-2 gap-1.5 w-full sm:flex sm:justify-end">
            <div onClick={() => _setPage("login")} className="border-button flex gap-1 px-3! justify-center  items-center">
                <LoginIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                <p>LogIn</p>
            </div>
            <div className="border-button flex gap-1 px-3! justify-center  items-center">
                <AssignmentCheckedIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                <p>Confirm</p>
            </div>
        </div>
    </div>
    else return <div id="login" className="space-y-3.5 h-full flex flex-col">
        <h1 className="text-3xl font-bold">Login</h1>
        <form action="" className="grow"></form>

        <div className=" grid grid-cols-2 gap-1.5 w-full sm:flex sm:justify-end">
            <div onClick={() => _setPage("register")} className="border-button flex gap-1 px-3! justify-center  items-center">
                <UserAddIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                <p>Register</p>
            </div>
            <div className="border-button flex gap-1 px-3! justify-center  items-center">
                <AssignmentCheckedIcon className="block" fillColor='transparent' strokeColor='currentColor' strokeWidth={2} />
                <p>Confirm</p>
            </div>
        </div>
    </div>
}