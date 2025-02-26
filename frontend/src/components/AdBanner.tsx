import React from "react";

// Xác định vị trí hiển thị quảng cáo
interface AdBannerProps {
  position: "top" | "middle" | "sidebar";
}

export default function AdBanner({ position }: AdBannerProps) {
  const getAdContent = () => {
    switch (position) {
      case "top":
        return (
          <div className="w-full h-20 bg-yellow-300 flex items-center justify-center text-black font-bold">
            🚀 Quảng cáo: Banner lớn trên đầu trang (728x90)
          </div>
        );
      case "middle":
        return (
          <div className="w-full h-40 bg-red-300 flex items-center justify-center text-white font-bold my-6">
            📣 Quảng cáo giữa bài viết (300x250)
          </div>
        );
      case "sidebar":
        return (
          <div className="w-full h-60 bg-blue-300 flex items-center justify-center text-white font-bold mt-6">
            🎯 Quảng cáo Sidebar (160x600)
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="ad-banner">{getAdContent()}</div>;
}
