interface FormInput {
    handleSubmit: any,
    type: string,
    action: any,
    text: string,
    isFetching: boolean
}

export default function FormAction({
    handleSubmit,
    type,
    action,
    text,
    isFetching
}: FormInput): JSX.Element {
    return (
        <>
            {
                type === 'Button' ?
                    <button
                        type={action}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900 mt-5"
                        onClick={handleSubmit}
                        disabled={isFetching}
                    >

                        {text}
                    </button>
                    :
                    <></>
            }
        </>
    )
}