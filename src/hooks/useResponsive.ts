import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
   const isMobile = useMediaQuery({ maxWidth: 768 });
   //    const isSmallLaptops = useMediaQuery({ maxWidth: 1200, minWidth: 768 });
   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
   const isDesktop = useMediaQuery({ minWidth: 1025 });
   const isLargeDesktop = useMediaQuery({ minWidth: 1440 });

   return { isMobile, isTablet, isDesktop, isLargeDesktop };
};

export default useResponsive;
