import type { ReactNode } from "react";
import type { NavListItem } from "./NavList";

export interface AvataredListItemInfo {
    // here need to add the avatar url or base64
    avatar: string;
    title: string;
    text: string;

    additionalElement?: ReactNode;
}

/**
 * 用于快速构建通讯录或最近消息项目的工厂方法
 * @param original NavListItem, 其中的customNode应改为用于AvataredListItem的角标、时间标记、置顶标记等内容
 * @param text 预览的最新一条消息的文字, 或是在通讯录中展示好友的bio
 * @param avatar 目标聊天/通讯录中, 对方用户的头像
 */
export const AvataredNavListItemFactory = (original: NavListItem, text?: string, avatar?: string): NavListItem => {
    return {...original, customNode: <AvataredListItem info={{avatar: avatar ?? '', title: original.name, text: text ?? '-', additionalElement: original.customNode}} />};
}

export default function AvataredListItem({ info = {avatar: "", title: "Item", text: "lorem ipsulm dolor sit amet"} } : {info?: AvataredListItemInfo}) {
    return <div className="w-full h-full p-1.5 px-2 flex flex-row gap-1.5 relative items-center ">
        <div className='rounded-full block-shadow aspect-square shrink-0 w-10 h-10 sm:w-8 sm:h-8 bg-linear-to-br from-rose-100 via-[#fecaca] to-yellow-300'></div>
        <div className="grid grid-cols-1 ">
            <h5 className="real-nowrap font-semibold text-lg max-w-50">{info.title}</h5>
            <p className="real-nowrap text-base/5 -translate-y-1 max-w-50">{info.text}</p>
        </div>
        {
            info.additionalElement && info.additionalElement
        }
    </div>
}