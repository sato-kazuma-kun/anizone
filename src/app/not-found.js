export default function NotFound() {
    
    return (
        <main className="flex items-center justify-center h-[65%]">
            <div className="text-center">
                <h1 className="text-4xl font-semibold text-red-500">404 Error</h1>
                <p className="mt-2 text-gray-400">The page you are looking for is either not available or currently under production.</p>
                <p className="mt-4 text-gray-400">Please check the URL or return to the <a href="/" className="!text-gray-200 inline-block after:content-[''] after:w-0 after:h-[2px] after:block after:bg-gray-200 hover:after:w-full after:duration-200">homepage</a>.</p>
                <p className="mt-4 text-gray-400">Or, </p>
                <p className="mt-4 text-gray-400">Check out my <a className="!text-gray-200 inline-block after:content-[''] after:w-0 after:h-[2px] after:block after:bg-gray-200 hover:after:w-full after:duration-200" href="https://kana-arima.vercel.app" target="_blank">Social media accounts</a>.</p>
            </div>
        </main>
    );
}
