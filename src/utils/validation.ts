import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { AnyObject, ObjectSchema } from "yup";

export { yupResolver };
export { yup };

export type InferFormValues<TSchema extends ObjectSchema<AnyObject>> = yup.InferType<TSchema>;
