import { _Link } from "@/pages/types";

interface Props {
    item: _Link;
};

export default function LinkButton({ item }: Props) {
    return (
        <div className="rounded-lg shadow-[0px_2px_16px_#0f172a1f] hover:bg-[#b2b7dc] bg-white
        transition-all transition-normal duration-[0.2s] ease-in-out delay-0">
            <a href={item.url}>
                <div className="flex items-center gap-[8px] p-[8px]">
                    <img className="size-[36px]" src={item.icon}/>
                    <span className="w-full text-center text-slate-950 font-medium">{item.title}</span>
                </div>
            </a>
        </div>
    );
};