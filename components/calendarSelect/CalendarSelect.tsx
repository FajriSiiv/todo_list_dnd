import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TodoProps } from "@/interface";
import { Control } from "react-hook-form";

interface FormCalendar {
  control: Control<TodoProps>;
}
export default function CalendarSelect({ control }: FormCalendar) {
  return (
    <FormField
      control={control}
      name="todoDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Tanggal task</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Berikan tanggal untuk taks kamu. Agar tidak lupa!
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
