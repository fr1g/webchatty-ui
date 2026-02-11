import { createContext, StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import Index from './pages'
import { Conversation } from './pages/conversation'
import { ThemeHelper, useThemeDetector } from './tools/ThemeDetector'
import Toast from './comps/Toast'
import EndpointLookup from './tools/EndpointLookup'
import RecentChats from './pages/navigations/RecentChats'
import { Setting1Icon, UserListIcon } from 'tdesign-icons-react'
import ColorModeSwitch from './comps/ColorModeSwitch'
import Contacts from './pages/navigations/Contacts'
import Settings from './pages/navigations/Settings'

function AppScope({ side, setSide, mgr }: { side: "right" | "left"; setSide: Function; mgr: ThemeHelper }) {

    const [nav, setNav] = useState<"recents" | "contacts" | "settings">("recents");
    const [chatting, setChatting] = useState<null | string>(null);

    const navigate = useNavigate();
    const mobNav = {
        goHome: () => {
            setSide("left");
            navigate("/");
        },
        switchTo: (v: string) => {
            navigate(v);
            setSide("right");
        }
    };

    return <div id='appscope'
        className=' 
                !!!desktop:
                    sm:grid sm:grid-cols-8 gap-0 sm:gap-3
                !!!mobile:
                    flex flex-row 
                !!!general:
                    transition h-full init?
            '>
        <div id='navigative' style={{ pointerEvents: 'visiblePainted' }}
            className={`${side == "left" ? 'grow nav-show' : 'nav-hide sm:block'} sm:col-span-3 lg:col-span-2 flex flex-col .  rounded-lg`}
        >
            <div id='logged-in'
                className='p-2 bg-slate-300/35 rounded-none rounded-b-lg sm:rounded-lg! block-shadow . shrink-0 flex flex-row items-center gap-1.5'
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

        </div>

        <div className={`${side == "right" ? 'grow nav-show' : 'nav-hide sm:block'} sm:col-span-5 lg:col-span-6 . bg-slate-200/80 dark:bg-slate-600/80 p-3 rounded-lg`}>
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
                <Route path='/chat' element={<Conversation targetChat={chatting} />} />
                <Route path='/settings/*' element={<Conversation targetChat={chatting} />} />
                <Route path='/user/:userId' element={<Conversation targetChat={chatting} />} />

                {/* chat, settings(app, account(info), account(privacy-mydetail)), contactInfo, addFriend, about, ... */}
                <Route index path='/*' element={<Index />} />
            </Routes>
        </div>
    </div>
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
                <div className='fixed bg-amber-300 p-3 shadow z-2222 top-3 right-3' onClick={() => {
                    if (side == "left") setSide("right");
                    else setSide("left")
                    console.log(side)
                }}>{side}</div>
                <EndpointLookup />
            </div>
        }
        <ToastableContext.Provider value={pushToast}>
            <BrowserRouter>
                <div className='bg-slate-400/90 dark:bg-slate-800 overflow-hidden sm:max-w-5xl sm:h-[80vh] 
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