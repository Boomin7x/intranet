import React, { useState } from "react";
import {
   IconButton,
   Menu,
   MenuItem,
   ListItemIcon,
   Typography,
   Tooltip,
   ListItemText,
} from "@mui/material";

interface Action {
   label: string;
   onClick: (event: React.MouseEvent<unknown>) => void;
   icon?: React.ReactNode;
}

interface ActionMenuProps {
   icon: React.ReactNode;
   actions: Action[];
   tooltipTitle?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ icon, actions, tooltipTitle }) => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleActionClick = (action: Action, event: React.MouseEvent<unknown>) => {
      action.onClick(event);
      handleClose();
   };

   return (
      <>
         <Tooltip title={tooltipTitle || "Actions"}>
            <IconButton
               aria-label="more"
               id="long-button"
               aria-controls={open ? "long-menu" : undefined}
               aria-expanded={open ? "true" : undefined}
               aria-haspopup="true"
               onClick={(event) => {
                  event.stopPropagation(); // Prevent row selection
                  handleClick(event);
               }}
               size="small"
            >
               {icon}
            </IconButton>
         </Tooltip>
         <Menu
            id="long-menu"
            MenuListProps={{
               "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
               },
            }}
         >
            {actions.map((action, index) => {
               return (
                  <MenuItem key={index} onClick={(event) => handleActionClick(action, event)}>
                     {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                     <ListItemIcon
                        sx={{
                           text: "black",
                        }}
                     >
                        {action.icon}
                     </ListItemIcon>
                     <ListItemText>
                        <Typography variant="inherit" noWrap>
                           {action.label}
                        </Typography>
                     </ListItemText>
                  </MenuItem>
               );
            })}
         </Menu>
      </>
   );
};

export default ActionMenu;
