import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { publicRoutes } from "./routes";
import type { RouteType } from "./types/route";
import { DefaultLayout } from "./components/Layout";

function App() {
    return (
        <Router>
            <Suspense
                fallback={
                    <div className="flex justify-center items-center min-h-screen">
                        Đang tải...
                    </div>
                }
            >
                <Routes>
                    {publicRoutes.map((route: RouteType, index) => {
                        const Page = route.component;

                        const Layout = route.layout || DefaultLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.layout === null ? (
                                        <Page /> // Không bọc trong Layout nếu layout là null
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                    ;
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
