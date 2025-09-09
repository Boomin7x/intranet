import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSwitcher = () => {
   const { i18n } = useTranslation();
   const { lang } = useParams();
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const changeLanguage = (newLang: string) => {
      i18n.changeLanguage(newLang);
      const currentPath = window.location.pathname;
      const newPath = `/${newLang}${currentPath.substring(currentPath.indexOf("/", 1))}`;
      navigate(newPath, { replace: true });
      handleClose();
   };

   return (
      <div>
         <Button
            id="language-button"
            aria-controls={open ? "language-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="inherit"
            startIcon={<LanguageIcon />}
         >
            {lang?.toUpperCase() || i18n.language.toUpperCase()}
         </Button>
         <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "language-button",
            }}
         >
            <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage("fr")}>Français</MenuItem>
         </Menu>
      </div>
   );
};

export default LanguageSwitcher;
