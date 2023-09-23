"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Controller,
  useForm,
} from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema } from "@/schema/zodSchema";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

type FormValues = z.infer<typeof FormSchema>;

export default function Home() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const watchMode = watch("modes");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Origin-destination card */}
        <Card className="m-5">
          <CardHeader>
            <CardTitle>Origin-Destination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="sm:flex sm:space-x-4">
              <div className="sm:w-1/2 mt-5">
                <Label className="mb-2">From</Label>
                <Input placeholder="from" {...register("from")} />
                {errors.from && (
                  <span className="text-red-500">{errors.from.message}</span>
                )}
              </div>
              <div className="sm:w-1/2 mt-5">
                <Label className="mb-2">To</Label>
                <Input placeholder="to" {...register("to")} />

                {errors.to && (
                  <span className="text-red-500">{errors.to.message}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Load card */}
        <Card className="m-5">
          <CardHeader>
            <CardTitle>Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="mb-5">
                <Label className="mb-2">Modes of Transporation</Label>
                <Controller
                  name={"modes"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        {field.value ? (
                          <SelectValue placeholder="Select " />
                        ) : (
                          "Select "
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FCL">
                          Full container load(FCL)
                        </SelectItem>
                        <SelectItem value="LCL">
                          Less container load(LCL)
                        </SelectItem>
                        <SelectItem value="BULK">Bulk</SelectItem>
                      </SelectContent>
                    </Select>
                    
                  )}
                />
                {errors.modes && (
                  <span className="text-red-500">{errors.modes.message}</span>
                )}
              </div>

              {/* SELECT==FCL */}
              {watchMode === "FCL" && (
                <>
                  <div className="flex flex-col space-y-2 mt-5">
                    <Label className="mb-2">Quantity</Label>
                    <Input
                      type="number"
                      placeholder="Enter the Quantity"
                      {...register("f_quantity")}
                    />
                    {(errors as any).f_quantity && (
                      <span className="text-red-500">
                        {(errors as any).f_quantity.message}
                      </span>
                    )}
                    <Label className="mb-2">Weight</Label>
                    <Input
                      type="number"
                      className="py-3 px-4 pr-16 block w-full border-none shadow-sm rounded-md text-sm"
                      placeholder="Enter the Weight"
                      {...register("f_weight")}
                    />
                    {(errors as any).f_weight && (
                      <span className="text-red-500">
                        {(errors as any).f_weight.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* SELECT=LCL */}

              {watchMode === "LCL" && (
                <>
                  <div className="flex  flex-col space-y-5 ">
                    <Controller
                      name={"l_container_type"}
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder="Select " />
                            ) : (
                              "Select "
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pallete">
                              Full container load(pallete)
                            </SelectItem>
                            <SelectItem value="boxes">
                              Less container load(boxes)
                            </SelectItem>
                            <SelectItem value="package">package</SelectItem>
                            <SelectItem value="bag">bag</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                     {(errors as any).l_container_type && (
                        <span className="text-red-500">
                          {(errors as any).l_container_type.message}
                        </span>
                      )}
                    <Input
                      placeholder="Enter the Quantity"
                      {...register("l_loading")}
                    />

                    {(errors as any).l_loading && (
                      <span className="text-red-500">
                        {(errors as any).l_loading.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* SELECT=package */}

              {watchMode === "BULK" && (
                <>
                  <div className="flex flex-col space-y-5">
                    <Label className="mb-2">Quantity</Label>
                    <Input
                      type="number"
                      placeholder="Enter the Quantity"
                      {...register("b_loading_rate")}
                    />
                    {(errors as any).b_loading_rate && (
                      <span className="text-red-500">
                        {(errors as any).b_loading_rate.message}
                      </span>
                    )}
                    <Label className="mb-2">Weight</Label>
                    <Input
                      type="number"
                      className="py-3 px-4 pr-16 block w-full border-none shadow-sm rounded-md text-sm"
                      placeholder="Enter the Weight"
                      {...register("b_discharge_rate")}
                    />
                    {(errors as any).b_discharge_rate && (
                      <span className="text-red-500">
                        {(errors as any).b_discharge_rate.message}
                      </span>
                    )}
                  </div>
                </>
              )}
              <div className="mt-5">
                <Label className="mb-2">Additional information</Label>
                <Textarea
                  placeholder="Write message..."
                  className="resize-none"
                  {...register("comment")}
                />
                {errors.comment && (
                      <span className="text-red-500">
                        {errors.comment.message}
                      </span>
                    )}
                
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit">Sumbit</Button>
      </form>
    </>
  );
}
