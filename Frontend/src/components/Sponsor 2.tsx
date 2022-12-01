interface SponsorDetails {
    name?: string,
    link: string
}
export default function SponsorDets({ name, link }: SponsorDetails): JSX.Element {
    return (
        <div className="bg-slate-100 py-2 px-4 rounded-lg w-3/4 flex justify-between my-1">
            <label className="font-bold text-sky-700 text-lg">
                {name}
            </label>
            <button className="rounded-full bg-emerald-500 p-2 text-white uppercase text-[11px] hover:bg-emerald-700 font-medium w-2/5 tracking-tighter font-sans" onClick={() => {
                window.open(link, "_blank");
            }}>visit {name}</button>
        </div>
    )
}