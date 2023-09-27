import * as z from "zod";

const fclSchema = z.object({
  from:z.object({
    address:z.string(),
    latitude:z.number().min(-90).max(90),
    longitude:z.number().min(-180).max(180),
  }),
  to:z.object({
    address:z.string(),
    latitude:z.number().min(-90).max(90),
    longitude:z.number().min(-180).max(180),
  }),
  modes: z.literal("FCL"),
  f_quantity: z.coerce.number().min(1).max(32767),
  f_weight: z.coerce.number().min(1).max(32767),
  comment: z.string().min(3).max(160).optional(),
});

const lclSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  modes: z.literal("LCL"),
  l_container_type: z.enum(["pallete", "boxes", "package", "bag"]),
  l_loading: z.string().min(1),
  comment: z.string().min(3).max(160),
});

const bulkSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  modes: z.literal("BULK"),
  b_loading_rate: z.coerce.number().min(1),
  b_discharge_rate: z.coerce.number().min(1),
  comment: z.string().min(3).max(160),
});

export const FormSchema = z.discriminatedUnion("modes", [
  fclSchema,
  lclSchema,
  bulkSchema,
]);



