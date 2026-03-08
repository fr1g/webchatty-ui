import { createContext, StrictMode, useEffect, useRef, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import Index from './pages'
import { Conversation } from './pages/conversation'
import { ThemeHelper, useThemeDetector } from './tools/ThemeDetector'
import Toast from './comps/Toast'
import EndpointLookup from './tools/EndpointLookup'
import RecentChats from './pages/navigations/RecentChats'
import { ChatBubbleIcon, Setting1Icon, UserListIcon } from 'tdesign-icons-react'
import ColorModeSwitch from './comps/ColorModeSwitch'
import Contacts from './pages/navigations/Contacts'
import Settings from './pages/navigations/Settings'

export interface ReusableFuncsDef {
    setChat: Function,
    setUserView: Function,
    setSettings: Function,
    goHome: Function,
    goTo: Function,
}

export const ReusableFuncs = createContext<ReusableFuncsDef | null>(null)
function AppScope({ side, setSide, mgr }: { side: "right" | "left"; setSide: Function; mgr: ThemeHelper }) {

    const mobileScreen = useRef(null);

    const [nav, setNav] = useState<"recents" | "contacts" | "settings">("recents");
    const navigate = useNavigate();
    const mobNav = {
        goHome: () => {
            setSide("left");
            navigate("/");
        },
        goTo: (v: string) => {
            navigate(v);
            setSide("right");
        } // 移动端视图切换两侧并导航
    };

    useEffect(() => {

        let status: any, bind: HTMLDivElement,
            elStart = (e: TouchEvent) => {

            },
            elEnd = (e: TouchEvent) => {

            }
        if (mobileScreen.current) {
            bind = (mobileScreen.current as HTMLDivElement);
            bind.addEventListener("touchstart", elStart);
            bind.addEventListener("touchend", elEnd);
        }

        return () => {
            if (bind) {
                bind.removeEventListener("touchstart", elStart);
                bind.removeEventListener("touchend", elEnd);
            }
        }
    }, [mobileScreen]);

    return <ReusableFuncs.Provider
        value={
            {
                setChat: (id: string) => {
                    console.log(`select chat: ${id}`);
                    mobNav.goTo(`/chat/${id}`);
                },
                setUserView: (id: string) => {
                    console.log(`select user: ${id}`);
                    mobNav.goTo(`/user/${id}`);
                },
                setSettings: (id: string) => {
                    console.log(`select user: ${id}`);
                    mobNav.goTo(`/settings/${id}`);
                },
                goHome: mobNav.goHome,
                goTo: mobNav.goTo,
            }
        }
    >
        <div id='appscope'
            className=' 
                !!!desktop:
                    sm:grid sm:grid-cols-8 gap-0 sm:gap-3
                !!!mobile:
                    flex flex-row 
                !!!general:
                    transition h-full init?    overflow-y-hidden
        '>
            <div id='navigative' style={{ pointerEvents: 'visiblePainted' }}
                className={`${side == "left" ? 'grow nav-show' : 'nav-hide sm:block'} sm:col-span-3 lg:col-span-2 flex flex-col .  rounded-lg`}
            >
                <div id='logged-in'
                    className='p-2 bg-slate-100/50 dark:bg-slate-200/15 shadow-md rounded-none rounded-b-lg sm:rounded-lg! block-shadow . shrink-0 flex flex-row items-center gap-1.5'
                >
                    <div className='rounded-full block-shadow aspect-square shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-linear-to-br from-rose-100 via-[#fecaca] to-yellow-300'></div>
                    <div className='grid grid-cols-1 grow  items-center'>
                        <h3 id='username' className='text-ellipsis overflow-hidden text-nowrap font-semibold'>Username</h3>
                        <p id='bio-state' className='hidden sm:block text-sm/4 text-nowrap text-ellipsis overflow-hidden '>Bio or state should be here written and limited</p>
                    </div>
                    <div className='hidden sm:grid grid-cols-1 shrink-0 gap-2'>
                        <ColorModeSwitch mgr={mgr} className='border-button' />
                        <div className='grid items-center border-button' onClick={() => setNav("settings")}>
                            <Setting1Icon fillColor='transparent' size='large' className='block' strokeColor='currentColor' strokeWidth={2} />
                        </div>

                    </div>
                    {/* avatar, name; desk:themeMode, contacts, bio/refreshState; mob: */}
                </div>
                <div className='pt-3! p-3 sm:p-0 grow rounded-lg'>
                    <div id="nav-scr" className='w-full h-full ?border'>
                        {
                            (() => {
                                switch (nav) {
                                    default:
                                    case "recents":
                                        return <RecentChats gotoContacts={() => setNav("contacts")} />;
                                    case "contacts":
                                        return <Contacts navGoBack={() => setNav("recents")} />;
                                    case "settings":
                                        return <Settings navGoBack={() => setNav("recents")} />;
                                }
                            })()
                        }
                    </div>
                </div>
                <div className='p-3 sm:hidden ' >
                    <div className='rounded-lg bg-slate-200/30 grid grid-cols-3 items-center gap-1.5? overflow-hidden shadow-md'>
                        <div onClick={() => setNav("recents")} className={`grid items-center justify-items-center active:bg-slate-300/30 p-1.5  ${nav == "recents" ? 'bg-slate-300/50' : ''}`}>
                            <div className='text-center'>
                                <ChatBubbleIcon size='large' fillColor='transparent' className='block mx-auto' strokeColor='currentColor' strokeWidth={2} />
                                <p className='text-sm mt-0.5'>Recents</p>
                            </div>
                        </div>
                        <div onClick={() => setNav("contacts")} className={`grid items-center justify-items-center active:bg-slate-300/30 p-1.5  ${nav == "contacts" ? 'bg-slate-300/50' : ''}`}>
                            <div className='text-center'>
                                <UserListIcon fillColor='transparent' size='large' className='block mx-auto' strokeColor='currentColor' strokeWidth={2} />
                                <p className='text-sm mt-0.5'>Contacts</p>
                            </div>
                        </div>
                        <div onClick={() => setNav("settings")} className={`grid items-center justify-items-center active:bg-slate-300/30 p-1.5  ${nav == "settings" ? 'bg-slate-300/50' : ''}`}>
                            <div className='text-center'>
                                <Setting1Icon fillColor='transparent' size='large' className='block mx-auto' strokeColor='currentColor' strokeWidth={2} />
                                <p className='text-sm mt-0.5'>Settings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`
                ${side == "right" ? 'grow nav-show' : 'nav-hide sm:block'} 
                sm:col-span-5 lg:col-span-6 . bg-slate-200/80 dark:bg-slate-600/80 sm:rounded-lg h-full overflow-hidden
            `}>
                <div className='overflow-x-hidden overflow-y-auto? w-full h-screen sm:h-full p-3' ref={mobileScreen}>
                    <Routes>
                        {/* route definition
                    - nav screens: wont switch right panel
                        - recent chats
                        - contacts (with sorting, A-Z groupping and other function entrace)
                        - settings menu
                    - right panel
                        - recent chats / contactInfo (to start chat) -> conversation (chat)
                        - conversation -> conversation info ()
                        - detailed settings ...-> embedded settings page
                        - contacts -> contactInfo / addFriend (requests, search)
                        - 

                    - entire
                        - no valid auth: hide appscope + show authpanel
                        - authed: show appscope + hide authpanel
                        - init: cover with init interface
                */}
                        <Route path='/chat' element={<Conversation />} />
                        <Route path='/chat/:chatId' element={<Conversation />} />
                        <Route path='/settings/:setting' element={<Conversation />} />
                        <Route path='/user/:userId' element={<Conversation />} />

                        {/* chat, settings(app, account(info), account(privacy-mydetail)), contactInfo, addFriend, about, ... */}
                        <Route index path='/*' element={<Index />} />
                    </Routes>
                </div>
            </div>
        </div>

    </ReusableFuncs.Provider>
}

export const ToastableContext = createContext<Function>(() => { });
function Layout() {
    const mgr = useThemeDetector();
    const [state, setState] = useState(false);
    mgr.bindedUpdater = () => setState(!state);
    const toast = useRef<any>(null);
    const pushToast = () => {
        if (toast.current) return toast.current.PushToast;
    };

    const [side, setSide] = useState<"left" | "right">("left");

    return <>
        {
            !true && <div className='fixed z-999' style={{ pointerEvents: 'visiblePainted' }}>
                <div className='fixed bg-amber-300 p-3 shadow-xl z-2222 top-3 right-3' onClick={() => {
                    if (side == "left") setSide("right");
                    else setSide("left")
                    console.log(side)
                }}>{side}</div>
                <EndpointLookup />
            </div>
        }
        <ToastableContext.Provider value={pushToast}>
            <BrowserRouter>
                <div className='bg-slate-50 sm:bg-[#c3ccd8] dark:bg-slate-800 overflow-hidden sm:max-w-5xl sm:h-[80vh] 
                    min-h-75 w-full block-shadow h-full relative p-0 sm:p-3 sm:rounded-lg '>
                    <AppScope side={side} setSide={setSide} mgr={mgr} />
                </div>
            </BrowserRouter>
        </ToastableContext.Provider>
        <Toast ref={toast} />
    </>

}

createRoot(document.getElementById('root')!).render(
    <Layout />
)