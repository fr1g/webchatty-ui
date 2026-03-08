


export default function Bubble({ message, opposite = false, extras }: { message: string, opposite?: boolean, extras?: string }) {
    return <div className={`grid p-0.5 ${opposite ? 'justify-items-start' : 'justify-items-end'}`}>
        <div className={`${opposite ? 'rounded-bl-xs bg-blue-50 dark:bg-slate-800' : 'rounded-tr-xs bg-blue-300 dark:bg-slate-500'} shadow p-2 rounded-xl `}>
            <div className={`${opposite ? '' : ''}`}>{message}</div>
            {
                extras && <div className={`${opposite ? '' : 'text-right'} text-xs/4`}>
                    {extras}
                </div>
            }
        </div>
    </div>
}