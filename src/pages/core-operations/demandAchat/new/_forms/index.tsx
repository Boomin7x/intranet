import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "../../../../../utils";
import { yup, yupResolver, type InferFormValues } from "../../../../../utils/validation";

// 1. Define the Yup validation schema
const schema = yup.object({
   requestorName: yup.string().required("Requestor name is required"),
   requestDate: yup.string().required("Request date is required"),
   justification: yup.string().required("Justification is required"),
   requiredByDate: yup.string().required("Required by date is required"),
   items: yup
      .array(
         yup.object({
            description: yup.string().required("Item description is required"),
            quantity: yup
               .number()
               .typeError("Quantity must be a number")
               .min(1, "Quantity must be at least 1")
               .required("Quantity is required"),
            unitPrice: yup
               .number()
               .typeError("Unit price must be a number")
               .min(0.01, "Unit price must be positive")
               .required("Unit price is required"),
         }),
      )
      .min(1, "At least one item is required")
      .required("Items are required"),
});

// 2. Infer the form values type from the schema
type FormValues = InferFormValues<typeof schema>;

const DemandAchatForm = () => {
   const { t } = useTranslation("demandAchatForm");

   // 3. Initialize react-hook-form
   const {
      control,
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: "onTouched",
      defaultValues: {
         requestorName: "",
         requestDate: dayjs().toISOString(), // Default to today's date
         justification: "",
         requiredByDate: dayjs().add(7, "day").toISOString(), // Default to 7 days from now
         items: [{ description: "", quantity: 1, unitPrice: 0 }],
      },
   });

   // 4. Hook for dynamic item array management
   const { fields, append, remove } = useFieldArray({
      control,
      name: "items",
   });

   // 5. Form submission handler
   const onSubmit = async (values: FormValues) => {
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));
         console.log("Form submitted successfully:", values);
         toast.success(t("form.submitSuccess"));
         reset(); // Reset form after successful submission
      } catch (error) {
         console.error("Form submission error:", error);
         toast.error(t("form.submitError"));
      }
   };

   return (
      <Box
         component="form"
         onSubmit={handleSubmit(onSubmit)}
         noValidate
         sx={{ p: { xs: 2, md: 4 } }}
      >
         <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
               {t("form.title")}
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }}>
               <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                     fullWidth
                     label={t("form.requestorNameLabel")}
                     {...register("requestorName")}
                     error={!!errors.requestorName}
                     helperText={errors.requestorName?.message}
                  />
               </Grid>
               <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                     name="requestDate"
                     control={control}
                     render={({ field }) => (
                        <DatePicker
                           label={t("form.requestDateLabel")}
                           value={dayjs(field.value)}
                           onChange={(newValue) => {
                              field.onChange(newValue?.toISOString() || "");
                           }}
                           slotProps={{
                              textField: {
                                 fullWidth: true,
                                 error: !!errors.requestDate,
                                 helperText: errors.requestDate?.message,
                              },
                           }}
                        />
                     )}
                  />
               </Grid>
               <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                     name="requiredByDate"
                     control={control}
                     render={({ field }) => (
                        <DatePicker
                           label={t("form.requiredByDateLabel")}
                           value={dayjs(field.value)}
                           onChange={(newValue) => {
                              field.onChange(newValue?.toISOString() || "");
                           }}
                           slotProps={{
                              textField: {
                                 fullWidth: true,
                                 error: !!errors.requiredByDate,
                                 helperText: errors.requiredByDate?.message,
                              },
                           }}
                        />
                     )}
                  />
               </Grid>
               <Grid size={{ xs: 12 }}>
                  <TextField
                     fullWidth
                     label={t("form.justificationLabel")}
                     multiline
                     rows={4}
                     {...register("justification")}
                     error={!!errors.justification}
                     helperText={errors.justification?.message}
                  />
               </Grid>
            </Grid>
         </Paper>

         <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
               <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {t("form.itemsTitle")}
               </Typography>
               <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
                  disabled={isSubmitting}
               >
                  {t("form.addItem")}
               </Button>
            </Box>

            {fields.map((field, index) => (
               <Box
                  key={field.id}
                  sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}
               >
                  <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">
                     <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                        <TextField
                           fullWidth
                           label={t("form.itemDescriptionLabel")}
                           {...register(`items.${index}.description`)}
                           error={!!errors.items?.[index]?.description}
                           helperText={errors.items?.[index]?.description?.message}
                           size="small"
                        />
                     </Grid>
                     <Grid size={{ xs: 6, sm: 3, md: 3 }}>
                        <TextField
                           fullWidth
                           type="number"
                           label={t("form.itemQuantityLabel")}
                           {...register(`items.${index}.quantity`)}
                           error={!!errors.items?.[index]?.quantity}
                           helperText={errors.items?.[index]?.quantity?.message}
                           size="small"
                        />
                     </Grid>
                     <Grid size={{ xs: 6, sm: 3, md: 3 }}>
                        <TextField
                           fullWidth
                           type="number"
                           label={t("form.itemUnitPriceLabel")}
                           {...register(`items.${index}.unitPrice`)}
                           error={!!errors.items?.[index]?.unitPrice}
                           helperText={errors.items?.[index]?.unitPrice?.message}
                           size="small"
                        />
                     </Grid>
                     <Grid
                        size={{ xs: 12, md: 1 }}
                        sx={{ display: "flex", justifyContent: "center" }}
                     >
                        <IconButton
                           onClick={() => remove(index)}
                           color="error"
                           disabled={isSubmitting || fields.length === 1} // Disable delete if only one item
                        >
                           <DeleteIcon />
                        </IconButton>
                     </Grid>
                  </Grid>
               </Box>
            ))}

            {errors.items && (
               <Typography color="error" variant="body2" sx={{ mt: 1, ml: 1 }}>
                  {errors.items.message}
               </Typography>
            )}
         </Paper>
      </Box>
   );
};

export default DemandAchatForm;
