import React, { useState, useEffect } from "react";
import {
   Box,
   Card,
   CardContent,
   Typography,
   Grid,
   CircularProgress,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Divider,
   Chip,
   Avatar,
   useTheme,
   LinearProgress,
   IconButton,
   Grow,
   Slide,
   Paper,
   type PaletteColor,
   Button,
} from "@mui/material";
import {
   PendingActions,
   CheckCircle,
   PieChart,
   Description,
   Done,
   Cancel,
   Schedule,
   AutoAwesome,
   ArrowUpward,
   ArrowDownward,
   Speed,
   Notifications,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import ResponsiveTable from "../list/ResponsiveTable";
import useGetDemandAchatList from "../list/_hooks/useGetDemandAchatList";
import { useNavigate, useParams } from "react-router-dom";

interface DashboardData {
   pendingRequests: number;
   approvedRequests: number;
   budgetUtilization: number;
   recentActivity: {
      id: string;
      itemName: string;
      action: string;
      date: string;
   }[];
}

const DemandAchatMainTab: React.FC = () => {
   const { t } = useTranslation("demandAchatDashboard");
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const navigate = useNavigate();
   const { lang } = useParams();

   const [data, setData] = useState<DashboardData | null>(null);
   const [loading, setLoading] = useState(true);
   const [animateCards, setAnimateCards] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);

         await new Promise((resolve) => setTimeout(resolve, 1500));

         const mockData: DashboardData = {
            pendingRequests: 24,
            approvedRequests: 156,
            budgetUtilization: 73.5,
            recentActivity: [
               {
                  id: "1",
                  itemName: t("sampleItems.laptops") || "Dell Laptops (10 units)",
                  action: "submitted",
                  date: "2024-09-10",
               },
               {
                  id: "2",
                  itemName: t("sampleItems.printers") || "Office Printers (3 units)",
                  action: "approved",
                  date: "2024-09-10",
               },
               {
                  id: "3",
                  itemName: t("sampleItems.software") || "Software Licenses",
                  action: "submitted",
                  date: "2024-09-09",
               },
               {
                  id: "4",
                  itemName: t("sampleItems.furniture") || "Office Furniture",
                  action: "cancelled",
                  date: "2024-09-09",
               },
               {
                  id: "5",
                  itemName: t("sampleItems.supplies") || "Office Supplies",
                  action: "approved",
                  date: "2024-09-08",
               },
            ],
         };

         setData(mockData);
         setLoading(false);
         setTimeout(() => setAnimateCards(true), 200);
      };

      fetchData();
   }, [t]);

   const getActionIcon = (action: string) => {
      switch (action.toLowerCase()) {
         case "submitted":
            return <Description />;
         case "approved":
            return <Done />;
         case "cancelled":
            return <Cancel />;
         default:
            return <Schedule />;
      }
   };

   const getActionColor = (action: string) => {
      switch (action.toLowerCase()) {
         case "submitted":
            return theme.palette.primary;
         case "approved":
            return theme.palette.success;
         case "cancelled":
            return theme.palette.error;
         default:
            return theme.palette.grey;
      }
   };

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("fr-FR", {
         day: "2-digit",
         month: "short",
         year: "numeric",
      });
   };

   // Helper functions for trend styling from home/index.tsx
   const getTrendIcon = (trendUp: boolean) => {
      if (trendUp) return <ArrowUpward sx={{ fontSize: 16 }} />;
      return <ArrowDownward sx={{ fontSize: 16 }} />;
   };

   const getTrendColor = (trendUp: boolean) => {
      if (trendUp) return theme.palette.success.main;
      return theme.palette.error.main;
   };

   const getTrendBackgroundColor = (trendUp: boolean) => {
      if (trendUp) return theme.palette.success.light + "20";
      return theme.palette.error.light + "20";
   };

   const {
      headCells,
      paginatedRequests,
      filteredRequests,
      orderBy,
      order,
      handleRequestSort,
      page,
      rowsPerPage,
      handleChangePage,
      handleChangeRowsPerPage,
      getStatusChipColor,
   } = useGetDemandAchatList();

   if (loading) {
      return (
         <Box
            sx={{
               flex: 1,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               position: "relative",
               overflow: "hidden",
            }}
         >
            <Paper
               sx={{
                  textAlign: "center",
                  backdropFilter: "blur(20px)",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "none",
               }}
            >
               <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
                  <CircularProgress
                     size={80}
                     thickness={4}
                     sx={{
                        color: theme.palette.primary.main,
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                     }}
                  />
                  <AutoAwesome
                     sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: theme.palette.primary.main,
                        fontSize: 32,
                        animation: "pulse 2s infinite",
                     }}
                  />
               </Box>
               <Typography
                  variant="h5"
                  sx={{
                     fontWeight: 600,
                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                     backgroundClip: "text",
                     WebkitBackgroundClip: "text",
                     WebkitTextFillColor: "transparent",
                     mb: 1,
                  }}
               >
                  {t("loading") || "Loading dashboard..."}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  Preparing your insights...
               </Typography>
            </Paper>
         </Box>
      );
   }

   if (!data) {
      return (
         <Box className="flex items-center justify-center min-h-96">
            <Typography variant="h6" color="error">
               {t("error") || "Error loading dashboard data"}
            </Typography>
         </Box>
      );
   }

   const metricCards = [
      {
         id: "pending",
         title: t("pendingRequests") || "Pending Requests",
         value: data.pendingRequests,
         trend: "+12%",
         trendUp: true,
         icon: PendingActions,
         color: theme.palette.warning,
         subtitle: t("vsLastMonth") || "vs last month",
      },
      {
         id: "approved",
         title: t("approvedRequests") || "Approved Requests",
         value: data.approvedRequests,
         trend: "+8%",
         trendUp: true,
         icon: CheckCircle,
         color: theme.palette.success,
         subtitle: t("vsLastMonth") || "vs last month",
      },
      {
         id: "budget",
         title: t("budgetUtilization") || "Budget Utilization",
         value: `${data.budgetUtilization}%`,
         trend: "-3%",
         trendUp: false,
         icon: PieChart,
         color: theme.palette.primary,
         subtitle: t("vsLastMonth") || "vs last month",
         progress: data.budgetUtilization,
      },
   ];

   return (
      <Box
         sx={{
            minHeight: "100vh",
            fontFamily: "Outfit, sans-serif",
         }}
      >
         {/* Welcome Section (adapted from home/index.tsx) */}
         <Box sx={{ mb: 4 }}>
            <Typography
               variant={isMobile ? "h5" : "h4"}
               sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "Outfit, sans-serif",
               }}
            >
               {t("welcomeMessage") || "Welcome to Your Dashboard"}
            </Typography>
            <Typography
               variant={isMobile ? "body2" : "body1"}
               sx={{
                  color: theme.palette.grey[600],
                  fontFamily: "Outfit, sans-serif",
               }}
            >
               {t("dashboardSummary") || "Here's an overview of your purchase requests."}
            </Typography>
         </Box>

         {/* KPI Cards (adapted from home/index.tsx) */}
         <Grid container spacing={3} sx={{ mb: 4 }}>
            {metricCards.map((card, index) => {
               const IconComponent = card.icon;
               return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.id}>
                     <Grow
                        in={animateCards}
                        timeout={800 + index * 200}
                        style={{ transformOrigin: "0 0 0" }}
                     >
                        <Card
                           elevation={2}
                           sx={{
                              height: "100%",
                              transition: "all 0.3s ease-in-out",
                              border: `1px solid ${theme.palette.grey[200]}`,
                              "&:hover": {
                                 boxShadow: theme.shadows[8],
                                 borderColor: card.color.light,
                                 transform: "translateY(-2px)",
                              },
                           }}
                        >
                           <CardContent sx={{ p: 3 }}>
                              <Box
                                 sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    mb: 2,
                                 }}
                              >
                                 <Box
                                    sx={{
                                       p: 1.5,
                                       borderRadius: 2,
                                       bgcolor: card.color.main + "15",
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                    }}
                                 >
                                    <IconComponent sx={{ color: card.color.main, fontSize: 28 }} />
                                 </Box>
                                 <Chip
                                    size="small"
                                    label={card.trend}
                                    icon={getTrendIcon(card.trendUp)}
                                    sx={{
                                       fontWeight: 600,
                                       color: getTrendColor(card.trendUp),
                                       bgcolor: getTrendBackgroundColor(card.trendUp),
                                       "& .MuiChip-icon": {
                                          color: getTrendColor(card.trendUp),
                                       },
                                    }}
                                 />
                              </Box>
                              <Typography
                                 variant="h4"
                                 sx={{
                                    fontWeight: 700,
                                    color: theme.palette.grey[900],
                                    mb: 0.5,
                                    fontFamily: "Outfit, sans-serif",
                                 }}
                              >
                                 {card.value}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 sx={{
                                    color: theme.palette.grey[600],
                                    fontFamily: "Outfit, sans-serif",
                                 }}
                              >
                                 {card.title}
                              </Typography>
                              {card.progress !== undefined && (
                                 <Box sx={{ mt: 2 }}>
                                    <LinearProgress
                                       variant="determinate"
                                       value={card.progress}
                                       sx={{
                                          height: 8,
                                          borderRadius: 4,
                                          backgroundColor: `${card.color.main}15`,
                                          "& .MuiLinearProgress-bar": {
                                             borderRadius: 4,
                                             background: `linear-gradient(90deg, ${card.color.main}, ${card.color.light})`,
                                          },
                                       }}
                                    />
                                 </Box>
                              )}
                           </CardContent>
                        </Card>
                     </Grow>
                  </Grid>
               );
            })}
         </Grid>

         {/* Recent Activity Feed (adapted from home/index.tsx) */}
         <Grid container spacing={3}>
            <Slide in={animateCards} direction="right" timeout={1200}>
               <Grid size={{ xs: 12, md: 8 }}>
                  <Card
                     elevation={2}
                     sx={{
                        border: `1px solid ${theme.palette.grey[200]}`,
                        mb: 3,
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                           boxShadow: theme.shadows[8],
                        },
                     }}
                  >
                     <CardContent>
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 2,
                              px: 3,
                           }}
                        >
                           <Typography
                              variant="h6"
                              sx={{
                                 fontWeight: 600,
                                 color: theme.palette.grey[900],
                                 fontFamily: "Outfit, sans-serif",
                                 textTransform: "Capitalize",
                              }}
                           >
                              {t("recentRequests") || "Recent Requests"}
                           </Typography>
                           <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              sx={{
                                 textTransform: "none",
                                 borderRadius: 2,
                                 fontWeight: 500,
                                 fontFamily: "Outfit, sans-serif",
                              }}
                              onClick={() => {
                                 // You may want to use a router navigation here
                                 navigate(
                                    `/${lang}/core-operations/demand-achat?navopened=Core+operations&tabs=list`,
                                 );
                              }}
                           >
                              {t("seeAll") || "See All"}
                           </Button>
                        </Box>
                        <ResponsiveTable
                           headCells={headCells}
                           paginatedRequests={paginatedRequests.slice(0, 5)}
                           filteredRequests={filteredRequests.slice(0, 5)}
                           orderBy={orderBy}
                           order={order}
                           handleRequestSort={handleRequestSort}
                           page={page}
                           rowsPerPage={rowsPerPage}
                           handleChangePage={handleChangePage}
                           handleChangeRowsPerPage={handleChangeRowsPerPage}
                           getStatusChipColor={getStatusChipColor}
                           showPagination={false}
                        />
                     </CardContent>
                  </Card>
               </Grid>
            </Slide>
            <Grid size={{ xs: 12, md: 4 }}>
               <Slide in={animateCards} direction="up" timeout={1200}>
                  <Card
                     elevation={2}
                     sx={{
                        border: `1px solid ${theme.palette.grey[200]}`,
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                           boxShadow: theme.shadows[8],
                        },
                     }}
                  >
                     <CardContent sx={{ p: 3 }}>
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 3,
                           }}
                        >
                           <Typography
                              variant="h6"
                              sx={{
                                 fontWeight: 600,
                                 color: theme.palette.grey[900],
                                 fontFamily: "Outfit, sans-serif",
                              }}
                           >
                              {t("recentActivity") || "Recent Activity"}
                           </Typography>
                           <IconButton
                              size="small"
                              sx={{
                                 color: theme.palette.grey[400],
                                 "&:hover": {
                                    color: theme.palette.primary.main,
                                 },
                              }}
                           >
                              <Notifications />
                           </IconButton>
                        </Box>

                        <List
                           sx={{
                              p: 0,
                              maxHeight: isMobile ? "auto" : 400,
                              overflowY: isMobile ? "visible" : "auto",
                              overflowX: "hidden",
                              "&::-webkit-scrollbar": {
                                 width: "6px",
                              },
                              "&::-webkit-scrollbar-track": {
                                 bgcolor: theme.palette.grey[100],
                                 borderRadius: "10px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                 bgcolor: theme.palette.grey[400],
                                 borderRadius: "10px",
                              },
                           }}
                        >
                           {data.recentActivity.map((activity, index) => (
                              <React.Fragment key={activity.id}>
                                 <ListItem
                                    sx={{
                                       px: 0,
                                       py: 1.5,
                                       display: "flex",
                                       gap: 2,
                                       flexDirection: isMobile ? "column" : "row",
                                       alignItems: isMobile ? "flex-start" : "center",
                                       "&:hover": {
                                          backgroundColor: `${theme.palette.primary.main}04`,
                                          transform: "translateX(4px)",
                                          transition:
                                             "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                       },
                                       transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                       cursor: "pointer",
                                    }}
                                 >
                                    <Box
                                       sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mb: isMobile ? 1 : 0,
                                          width: isMobile ? "100%" : "auto",
                                       }}
                                    >
                                       <ListItemIcon sx={{ minWidth: 50 }}>
                                          <Avatar
                                             sx={{
                                                width: 36,
                                                height: 36,
                                                bgcolor:
                                                   (getActionColor(activity.action) as PaletteColor)
                                                      .main + "15",
                                                color: (
                                                   getActionColor(activity.action) as PaletteColor
                                                ).main,
                                             }}
                                          >
                                             {getActionIcon(activity.action)}
                                          </Avatar>
                                       </ListItemIcon>
                                       <ListItemText
                                          primary={
                                             <Typography
                                                variant="body2"
                                                sx={{
                                                   fontWeight: 500,
                                                   color: theme.palette.grey[900],
                                                   mb: 0.5,
                                                   fontFamily: "Outfit, sans-serif",
                                                }}
                                             >
                                                {activity.itemName}
                                             </Typography>
                                          }
                                          sx={{ m: 0, flexShrink: 1, minWidth: 0 }}
                                       />
                                    </Box>

                                    <Box
                                       sx={{
                                          flex: 1,
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                          flexWrap: "wrap",
                                          ml: isMobile ? "50px" : "0", // Align content with icon on mobile
                                          justifyContent: isMobile ? "flex-start" : "flex-end",
                                       }}
                                    >
                                       <Chip
                                          label={t(`actions.${activity.action}`) || activity.action}
                                          size="small"
                                          sx={{
                                             backgroundColor: `${(getActionColor(activity.action) as PaletteColor).main}15`,
                                             color: (
                                                getActionColor(activity.action) as PaletteColor
                                             ).main,

                                             fontWeight: 600,
                                             textTransform: "capitalize",
                                             "&:hover": {
                                                backgroundColor: `${(getActionColor(activity.action) as PaletteColor).main}25`,
                                             },
                                          }}
                                       />
                                       <Typography
                                          variant="caption"
                                          sx={{
                                             ml: isMobile ? 0 : "auto",
                                             color: theme.palette.grey[500],
                                             fontFamily: "Outfit, sans-serif",
                                          }}
                                       >
                                          {formatDate(activity.date)}
                                       </Typography>
                                    </Box>
                                 </ListItem>
                                 {index < data.recentActivity.length - 1 && (
                                    <Divider
                                       variant="inset"
                                       component="li"
                                       sx={{
                                          ml: isMobile ? 0 : 6,
                                          borderColor: theme.palette.grey[200],
                                       }}
                                    />
                                 )}
                              </React.Fragment>
                           ))}
                           {data.recentActivity.length === 0 && (
                              <Box sx={{ textAlign: "center", py: 4 }}>
                                 <Speed
                                    sx={{ fontSize: 48, color: theme.palette.text.disabled, mb: 2 }}
                                 />
                                 <Typography variant="body1" color="text.secondary">
                                    {t("noRecentActivity") || "No recent activity to display"}
                                 </Typography>
                              </Box>
                           )}
                        </List>
                     </CardContent>
                  </Card>
               </Slide>
            </Grid>
         </Grid>
      </Box>
   );
};

export default DemandAchatMainTab;
