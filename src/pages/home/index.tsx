import {
   AccessTime,
   Analytics,
   ArrowDownward,
   ArrowUpward,
   Assignment,
   AttachMoney,
   BarChart,
   Group,
   Notifications,
   People,
   PieChart,
   Remove,
   TrendingUp,
} from "@mui/icons-material";
import {
   Avatar,
   Box,
   Button,
   Card,
   CardContent,
   Chip,
   Divider,
   IconButton,
   Stack,
   Typography,
   useTheme,
   useMediaQuery,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import MainLayout from "../../components/layout/MainLayout";

const DashboardHome: React.FC = () => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const { t } = useTranslation("home"); // Use the 'home' namespace

   // Mock data for demonstration
   const kpiData = [
      {
         title: t("totalUsers"),
         value: "12,459",
         trend: "+12%",
         trendDirection: "up",
         icon: People,
         color: theme.palette.primary.main,
      },
      {
         title: t("revenueThisQuarter"),
         value: "$45,290",
         trend: "+8.2%",
         trendDirection: "up",
         icon: AttachMoney,
         color: theme.palette.success.main,
      },
      {
         title: t("openTasks"),
         value: "23",
         trend: "-5",
         trendDirection: "down",
         icon: Assignment,
         color: theme.palette.warning.main,
      },
      {
         title: t("newLeads"),
         value: "156",
         trend: "+18%",
         trendDirection: "up",
         icon: TrendingUp,
         color: theme.palette.info.main,
      },
   ];

   const recentActivities = [
      {
         id: 1,
         description: t("newUserRegistration"),
         timestamp: "2 minutes ago",
         type: "user",
         icon: People,
      },
      {
         id: 2,
         description: t("paymentReceived"),
         timestamp: "15 minutes ago",
         type: "payment",
         icon: AttachMoney,
      },
      {
         id: 3,
         description: t("projectCompleted"),
         timestamp: "1 hour ago",
         type: "project",
         icon: Assignment,
      },
      {
         id: 4,
         description: t("newTeamMember"),
         timestamp: "3 hours ago",
         type: "team",
         icon: Group,
      },
      {
         id: 5,
         description: t("monthlyReportGenerated"),
         timestamp: "5 hours ago",
         type: "report",
         icon: BarChart,
      },
   ];

   const quickActions = [
      {
         title: t("createNewReport"),
         description: t("generateAnalytics"),
         icon: BarChart,
         color: theme.palette.primary.main,
      },
      {
         title: t("manageTeam"),
         description: t("addUpdateTeamMembers"),
         icon: Group,
         color: theme.palette.secondary.main,
      },
      {
         title: t("viewAnalytics"),
         description: t("detailedPerformanceMetrics"),
         icon: Analytics,
         color: theme.palette.info.main,
      },
   ];

   const getTrendIcon = (direction: string) => {
      if (direction === "up") return <ArrowUpward sx={{ fontSize: 16 }} />;
      if (direction === "down") return <ArrowDownward sx={{ fontSize: 16 }} />;
      return <Remove sx={{ fontSize: 16 }} />;
   };

   const getTrendColor = (direction: string) => {
      if (direction === "up") return theme.palette.success.main;
      if (direction === "down") return theme.palette.error.main;
      return theme.palette.grey[500];
   };

   const getTrendBackgroundColor = (direction: string) => {
      if (direction === "up") return theme.palette.success.light + "20";
      if (direction === "down") return theme.palette.error.light + "20";
      return theme.palette.grey[100];
   };

   return (
      <MainLayout>
         <Box
            sx={{
               p: isMobile ? 2 : 3,
               bgcolor: theme.palette.grey[50],
               minHeight: "100vh",
               fontFamily: "Outfit, sans-serif",
            }}
         >
            {/* Welcome Section */}
            <Box sx={{ mb: isMobile ? 3 : 4 }}>
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
                  {t("welcomeMessage")}
               </Typography>
               <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{
                     color: theme.palette.grey[600],
                     fontFamily: "Outfit, sans-serif",
                  }}
               >
                  {t("dashboardSummary")}
               </Typography>
            </Box>

            {/* KPI Cards */}
            <Box
               sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 2 : 3,
                  mb: isMobile ? 3 : 4,
               }}
            >
               {kpiData.map((kpi, index) => {
                  const IconComponent = kpi.icon;
                  return (
                     <Box
                        key={index}
                        sx={{
                           flex: "1 1 23%", // Distribute space, allow shrinking/growing
                           minWidth: 0, // Allow content to shrink
                           width: isMobile ? "100%" : "auto",
                        }}
                     >
                        <Card
                           elevation={2}
                           sx={{
                              height: "100%",
                              transition: "all 0.3s ease-in-out",
                              border: `1px solid ${theme.palette.grey[200]}`, // Subtle border
                              "&:hover": {
                                 boxShadow: theme.shadows[8],
                                 borderColor: theme.palette.primary.light,
                                 transform: "translateY(-2px)",
                              },
                           }}
                        >
                           <CardContent sx={{ p: isMobile ? 2 : 3 }}>
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
                                       bgcolor: kpi.color + "15", // Light background for icon
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                    }}
                                 >
                                    <IconComponent sx={{ color: kpi.color, fontSize: 28 }} />
                                 </Box>
                                 <Chip
                                    size="small"
                                    label={kpi.trend}
                                    icon={getTrendIcon(kpi.trendDirection)}
                                    sx={{
                                       fontWeight: 600,
                                       color: getTrendColor(kpi.trendDirection),
                                       bgcolor: getTrendBackgroundColor(kpi.trendDirection),
                                       "& .MuiChip-icon": {
                                          color: getTrendColor(kpi.trendDirection),
                                       },
                                    }}
                                 />
                              </Box>
                              <Typography
                                 variant={isMobile ? "h6" : "h4"}
                                 sx={{
                                    fontWeight: 700,
                                    color: theme.palette.grey[900],
                                    mb: 0.5,
                                    fontFamily: "Outfit, sans-serif",
                                 }}
                              >
                                 {kpi.value}
                              </Typography>
                              <Typography
                                 variant={isMobile ? "caption" : "body2"}
                                 sx={{
                                    color: theme.palette.grey[600],
                                    fontFamily: "Outfit, sans-serif",
                                 }}
                              >
                                 {kpi.title}
                              </Typography>
                           </CardContent>
                        </Card>
                     </Box>
                  );
               })}
            </Box>

            <Box
               sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 2 : 3,
               }}
            >
               {/* Recent Activity Feed */}
               <Box
                  sx={{
                     flex: isMobile ? "1 1 100%" : "2 1 65%",
                     minWidth: 0,
                  }}
               >
                  <Card
                     elevation={2}
                     sx={{
                        border: `1px solid ${theme.palette.grey[200]}`, // Subtle border
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                           boxShadow: theme.shadows[8],
                        },
                     }}
                  >
                     <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: isMobile ? 2 : 3,
                           }}
                        >
                           <Typography
                              variant={isMobile ? "h6" : "h5"}
                              sx={{
                                 fontWeight: 600,
                                 color: theme.palette.grey[900],
                                 fontFamily: "Outfit, sans-serif",
                              }}
                           >
                              {t("recentActivity")}
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

                        <Stack
                           spacing={2}
                           sx={{
                              maxHeight: isMobile ? 300 : 400,
                              overflowY: isMobile ? "auto" : "auto",
                              // Custom scrollbar styles
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
                           {recentActivities.map((activity, index) => {
                              const IconComponent = activity.icon;
                              return (
                                 <Box key={activity.id}>
                                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                       <Avatar
                                          sx={{
                                             width: isMobile ? 32 : 40,
                                             height: isMobile ? 32 : 40,
                                             bgcolor: theme.palette.primary.light,
                                             color: theme.palette.primary.contrastText,
                                          }}
                                       >
                                          <IconComponent fontSize={isMobile ? "small" : "medium"} />
                                       </Avatar>
                                       <Box sx={{ flex: 1, minWidth: 0 }}>
                                          <Typography
                                             variant={isMobile ? "body2" : "body1"}
                                             sx={{
                                                color: theme.palette.grey[900],
                                                fontWeight: 500,
                                                mb: 0.5,
                                                fontFamily: "Outfit, sans-serif",
                                             }}
                                          >
                                             {activity.description}
                                          </Typography>
                                          <Box
                                             sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: theme.palette.grey[500],
                                             }}
                                          >
                                             <AccessTime
                                                sx={{ fontSize: isMobile ? 12 : 14, mr: 0.5 }}
                                             />
                                             <Typography
                                                variant={isMobile ? "caption" : "body2"}
                                                sx={{ fontFamily: "Outfit, sans-serif" }}
                                             >
                                                {activity.timestamp}
                                             </Typography>
                                          </Box>
                                       </Box>
                                    </Box>
                                    {index < recentActivities.length - 1 && (
                                       <Divider sx={{ mt: isMobile ? 1.5 : 2 }} />
                                    )}
                                 </Box>
                              );
                           })}
                        </Stack>
                     </CardContent>
                  </Card>
               </Box>
               {/* Right Column */}
               <Box
                  sx={{
                     flex: isMobile ? "1 1 100%" : "1 1 35%",
                     minWidth: 0,
                  }}
               >
                  <Stack spacing={isMobile ? 2 : 3}>
                     {/* Quick Actions */}
                     <Card
                        elevation={2}
                        sx={{
                           border: `1px solid ${theme.palette.grey[200]}`, // Subtle border
                           transition: "box-shadow 0.3s ease-in-out",
                           "&:hover": {
                              boxShadow: theme.shadows[8],
                           },
                        }}
                     >
                        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                           <Typography
                              variant={isMobile ? "h6" : "h5"}
                              sx={{
                                 fontWeight: 600,
                                 color: theme.palette.grey[900],
                                 mb: isMobile ? 1.5 : 2,
                                 fontFamily: "Outfit, sans-serif",
                              }}
                           >
                              {t("quickActions")}
                           </Typography>
                           <Stack spacing={isMobile ? 1 : 1.5}>
                              {quickActions.map((action, index) => {
                                 const IconComponent = action.icon;
                                 return (
                                    <Button
                                       key={index}
                                       variant="outlined"
                                       startIcon={<IconComponent />}
                                       fullWidth
                                       sx={{
                                          justifyContent: "flex-start",
                                          p: isMobile ? 1.5 : 2,
                                          borderColor: theme.palette.grey[300],
                                          color: theme.palette.grey[700],
                                          textAlign: "left",
                                          transition: "all 0.2s ease-in-out",
                                          "&:hover": {
                                             bgcolor: theme.palette.grey[50],
                                             borderColor: theme.palette.primary.main,
                                             color: theme.palette.primary.main,
                                             transform: "translateX(4px)",
                                          },
                                       }}
                                    >
                                       <Box sx={{ textAlign: "left", flex: 1 }}>
                                          <Typography
                                             variant={isMobile ? "body2" : "body1"}
                                             sx={{
                                                fontWeight: 500,
                                                fontFamily: "Outfit, sans-serif",
                                             }}
                                          >
                                             {action.title}
                                          </Typography>
                                          <Typography
                                             variant={isMobile ? "caption" : "body2"}
                                             sx={{
                                                color: theme.palette.grey[500],
                                                fontFamily: "Outfit, sans-serif",
                                             }}
                                          >
                                             {action.description}
                                          </Typography>
                                       </Box>
                                    </Button>
                                 );
                              })}
                           </Stack>
                        </CardContent>
                     </Card>

                     {/* Data Visualization Placeholder */}
                     <Card
                        elevation={2}
                        sx={{
                           border: `1px solid ${theme.palette.grey[200]}`, // Subtle border
                           transition: "box-shadow 0.3s ease-in-out",
                           "&:hover": {
                              boxShadow: theme.shadows[8],
                           },
                        }}
                     >
                        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                           <Typography
                              variant={isMobile ? "h6" : "h5"}
                              sx={{
                                 fontWeight: 600,
                                 color: theme.palette.grey[900],
                                 mb: isMobile ? 1.5 : 2,
                                 fontFamily: "Outfit, sans-serif",
                              }}
                           >
                              {t("performanceOverview")}
                           </Typography>
                           <Box
                              sx={{
                                 height: 200,
                                 background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
                                 borderRadius: 2,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 border: `2px dashed ${theme.palette.primary.light}`,
                                 transition: "all 0.3s ease-in-out",
                                 "&:hover": {
                                    borderColor: theme.palette.primary.main,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.light}30, ${theme.palette.secondary.light}30)`,
                                 },
                              }}
                           >
                              <Stack alignItems="center" spacing={1.5}>
                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <BarChart
                                       sx={{
                                          color: theme.palette.primary.main,
                                          fontSize: 32,
                                       }}
                                    />
                                    <PieChart
                                       sx={{
                                          color: theme.palette.secondary.main,
                                          fontSize: 32,
                                       }}
                                    />
                                 </Box>
                                 <Typography
                                    variant="body2"
                                    sx={{
                                       color: theme.palette.grey[600],
                                       textAlign: "center",
                                       fontFamily: "Outfit, sans-serif",
                                    }}
                                 >
                                    {t("chartPlaceholder")}
                                 </Typography>
                              </Stack>
                           </Box>
                        </CardContent>
                     </Card>
                  </Stack>
               </Box>
            </Box>
         </Box>
      </MainLayout>
   );
};

export default DashboardHome;
