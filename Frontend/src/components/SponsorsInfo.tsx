import SponsorDets from "./Sponsor"

export default function Sponsor({ sponsor }: any): JSX.Element {
    return (
        <div className="flex items-center justify-center flex-col">
            <SponsorDets name={sponsor.name} link={sponsor.link} />
        </div>
    )
}