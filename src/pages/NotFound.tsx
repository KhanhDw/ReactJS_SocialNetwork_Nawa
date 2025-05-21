function NotFound() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-red-600">
                    404 - Trang Không Tìm Thấy
                </h1>
                <p className="mt-4 text-lg">
                    Xin lỗi, trang bạn tìm không tồn tại.
                </p>
                <a
                    href="/"
                    className="mt-6 text-blue-500 hover:underline"
                >
                    Quay về Trang Chủ
                </a>
            </div>
        </>
    );
}
export default NotFound;
