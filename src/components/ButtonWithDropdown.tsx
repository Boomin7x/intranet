import { Popover, Tooltip } from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { type FC, type ReactNode } from "react";

interface IButtonWithDropdown {
   children: ReactNode;
   tooltipTitle: string;
   trigger: ReactNode;
}
const ButtonWithDropdown: FC<IButtonWithDropdown> = ({ children, tooltipTitle, trigger }) => {
   return (
      <PopupState
         // key={"navElements"}
         variant="popover"
         popupId={"demo-popup-popover"}
      >
         {(popupState) => (
            <div>
               <Tooltip key={"navElements"} title={tooltipTitle} arrow>
                  <button {...bindTrigger(popupState)}>{trigger}</button>
               </Tooltip>
               <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                     vertical: "bottom",
                     horizontal: "right",
                  }}
                  transformOrigin={{
                     vertical: "top",
                     horizontal: "right",
                  }}
               >
                  <div className="flex flex-col min-w-2xs ">{children}</div>
               </Popover>
            </div>
         )}
      </PopupState>
   );
};

export default ButtonWithDropdown;
