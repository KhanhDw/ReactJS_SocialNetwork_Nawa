import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Header_placeholder from "../components/Header/components/Header-placeholder";
import { HeaderProvider } from "../../../contexts/HeaderContext";
import {
    type ReactNode,
    useEffect,
    useState,
    type ReactElement,
    isValidElement,
    cloneElement,
} from "react";

// Định nghĩa interface cho props
export interface HeaderOnlyProps {
    children: ReactNode;
}

function HeaderOnly({ children }: HeaderOnlyProps) {
    const location = useLocation();
    // Use a single state variable for hiding the header
    const [hideHeader, setHideHeader] = useState<boolean>(
        location.pathname === "/chat" || location.pathname === "/learning"
    );
    const [scrollY, setScrolled] = useState(0);

    // Update hideHeader when the route changes
    useEffect(() => {
        setHideHeader(location.pathname === "/chat" || location.pathname === "/learning" || location.pathname === "/community");

        const handleScroll = () => {
            setScrolled(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // Tính toán translateY và opacity dựa trên scroll
    const maxScroll = 60;
    const clampedScroll = Math.min(scrollY, maxScroll);

    const translateY = -clampedScroll; // Dịch lên tối đa -60px
    const opacity = 1 - clampedScroll / maxScroll; // Giảm opacity từ 1 đến 0
    const top = 60 - clampedScroll; // Từ 60 đến 0
    const height = `calc(100vh - ${top}px)`;

    // Nếu children là 1 element có thể nhận props, ta thêm props vào
    const modifiedChildren = isValidElement(children)
        ? cloneElement(
              children as ReactElement<{
                  isScrolled_height?: string;
                  isScrolled_top?: number;
              }>,
              {
                  isScrolled_height: height,
                  isScrolled_top: top,
              }
          )
        : children;

    return (
        <HeaderProvider
            isScrolled_top={top}
            isScrolled_height={height}
        >
            <div className="flex flex-col">
                {/* ✅ Header có hiệu ứng mờ và trượt lên */}
                {!hideHeader && (
                    <div
                        style={{
                            transform: `translateY(${translateY}px)`,
                            opacity,
                            transition: "all 0.3s ease-in-out",
                        }}
                        className="fixed top-0 left-0 right-0 z-50"
                    >
                        <Header />
                        <Header_placeholder />
                    </div>
                )}
                <div
                    className={`${
                        hideHeader ? "" : "pt-[60px]"
                    } bg-gray-800 `}
                >
                    {modifiedChildren}
                </div>
            </div>
        </HeaderProvider>
    );
}

export default HeaderOnly;