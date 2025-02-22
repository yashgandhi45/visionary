export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
                <div className="w-10 h-10 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin"></div>
            </div>
        </div>
    )
}