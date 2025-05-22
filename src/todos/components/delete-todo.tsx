"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteAllTodos } from "@/todos/helpers/todos";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteTodo() {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const router = useRouter();

  const deleteCompleted = async () => {
    await deleteAllTodos(true);
    setOpenAlertDialog(false);
    router.refresh();
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              onClick={() => setOpenAlertDialog(true)}
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete completed todos</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialog open={openAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all the
              completed todos from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlertDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCompleted()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
