import { Link } from 'react-router-dom';
interface HeaderParams {
    heading: string,
    paragraph: string,
    linkName: string,
    linkUrl: string
}

export default function LoginHeader({
    heading,
    paragraph,
    linkName,
    linkUrl = "#"
}: HeaderParams): JSX.Element {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img
                    alt=""
                    className="h-14 w-14"
                    src="/img/logo.png" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-700">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
                <Link to={linkUrl} className="font-bold text-green-600 hover:text-green-500 underline">
                    {linkName}
                </Link>
            </p>
        </div>
    )
}