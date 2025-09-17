import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { type FC } from "react";
import { useRecoilState } from "recoil";
import { actionDrawerState } from "../../../store/atom";

const ActionsDrawer: FC = () => {
   const [isActionDrawer, setIsActionDrawer] = useRecoilState(actionDrawerState);
   return (
      <Drawer
         open={isActionDrawer}
         onClose={() => setIsActionDrawer((prev) => !prev)}
         anchor="right"
      >
         <Box
            sx={{
               minWidth: "20rem",
               fontWeight: "bold",
               fontSize: "x-large",
               position: "relative",
               p: 2,
               borderBottom: `1px solid ${grey[300]}`,
            }}
         >
            Actions
            <IconButton
               onClick={() => setIsActionDrawer((prev) => !prev)}
               size="small"
               sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
               }}
            >
               <CloseIcon
                  sx={{
                     fontSize: "20px",
                  }}
               />
            </IconButton>
         </Box>
         <Box
            sx={{
               flex: 1,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               justifyContent: "center",
               color: grey[600],
            }}
         >
            All Actions Goes Here
         </Box>
      </Drawer>
   );
};

export default ActionsDrawer;
