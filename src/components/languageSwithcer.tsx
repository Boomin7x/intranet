/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Box, Typography, useTheme, alpha, Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageIcon from "@mui/icons-material/Language";
import CountryList from "country-list-with-dial-code-and-flag";

interface LanguageOption {
   code: string;
   name: string;
   countryCode: string;
   flag?: string;
}

const LanguageSwitcher = () => {
   const theme = useTheme();
   const { i18n } = useTranslation();
   const { lang } = useParams();
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const countries = CountryList.getAll();

   // Language to country code mapping
   const languageMapping = useMemo((): LanguageOption[] => {
      const mapping = [
         { code: "en", name: "English", countryCode: "US" },
         { code: "fr", name: "Français", countryCode: "FR" },
      ];

      return mapping.map((lang) => {
         const country = countries.find((c) => c.code === lang.countryCode);
         return {
            ...lang,
            flag: country?.flag,
         };
      });
   }, []);

   const currentLanguage = useMemo(() => {
      const currentLang = lang || i18n.language;
      return languageMapping.find((l) => l.code === currentLang) || languageMapping[0];
   }, [lang, i18n.language, languageMapping]);

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

   const FlagDisplay = ({
      flag,
      name,
      size = 24,
   }: {
      flag?: string;
      name: string;
      size?: number;
   }) => {
      if (flag) {
         return (
            <Box
               sx={{
                  width: size,
                  height: size,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: size * 0.8,
                  borderRadius: "50%",
                  border: "none",
                  // border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
               }}
               title={`${name} flag`}
            >
               {flag}
            </Box>
         );
      }

      return (
         <Avatar
            sx={{
               width: size,
               height: size,
               border: "none",
               bgcolor: alpha(theme.palette.primary.main, 0.1),
               color: theme.palette.primary.main,
            }}
         >
            <LanguageIcon sx={{ fontSize: size * 0.6 }} />
         </Avatar>
      );
   };

   return (
      <Box>
         <Button
            id="language-button"
            aria-controls={open ? "language-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="outlined"
            endIcon={
               <ExpandMoreIcon
                  sx={{
                     transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                     transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
               />
            }
            sx={{
               minWidth: 140,
               height: 40,
               borderRadius: 2,
               textTransform: "none",
               fontWeight: 500,
               color: theme.palette.text.primary,
               borderColor: alpha(theme.palette.divider, 0.3),
               bgcolor: "transparent",
               px: 2,
               py: 1,
               "&:hover": {
                  bgcolor: alpha(theme.palette.action.hover, 0.04),
                  borderColor: alpha(theme.palette.primary.main, 0.3),
               },
               "&:focus": {
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
               },
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  flex: 1,
               }}
            >
               <FlagDisplay flag={currentLanguage.flag} name={currentLanguage.name} size={20} />
               <Typography
                  variant="body2"
                  sx={{
                     fontWeight: 500,
                     color: "inherit",
                  }}
               >
                  {currentLanguage.name}
               </Typography>
            </Box>
         </Button>

         <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "language-button",
            }}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
            sx={{
               "& .MuiPaper-root": {
                  minWidth: 160,
                  borderRadius: 2,
                  mt: 0.5,
                  boxShadow: theme.shadows[3],
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  "&:before": {
                     content: '""',
                     display: "block",
                     position: "absolute",
                     top: 0,
                     left: 14,
                     width: 10,
                     height: 10,
                     bgcolor: "background.paper",
                     border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                     borderRight: "none",
                     borderBottom: "none",
                     transform: "translateY(-50%) rotate(45deg)",
                     zIndex: 0,
                  },
               },
            }}
         >
            {languageMapping.map((language) => (
               <MenuItem
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  selected={currentLanguage.code === language.code}
                  sx={{
                     py: 1.5,
                     px: 2,
                     minHeight: "auto",
                     "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                     },
                     "&.Mui-selected": {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        "&:hover": {
                           bgcolor: alpha(theme.palette.primary.main, 0.12),
                        },
                     },
                  }}
               >
                  <Box
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: "100%",
                     }}
                  >
                     <FlagDisplay flag={language.flag} name={language.name} size={24} />
                     <Typography
                        variant="body2"
                        sx={{
                           fontWeight: currentLanguage.code === language.code ? 600 : 400,
                           color:
                              currentLanguage.code === language.code
                                 ? theme.palette.primary.main
                                 : theme.palette.text.primary,
                        }}
                     >
                        {language.name}
                     </Typography>
                  </Box>
               </MenuItem>
            ))}
         </Menu>
      </Box>
   );
};

export default LanguageSwitcher;
