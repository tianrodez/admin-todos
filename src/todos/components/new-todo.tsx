"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as todosApi from "@/todos/helpers/todos";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

const createTodoSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
});

export function NewTodo() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createTodoSchema>>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createTodoSchema>) {
    todosApi.createTodo(values.description);
    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Todo Form</DialogTitle>
          <DialogDescription>Here you can create a new todo.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Type something..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
