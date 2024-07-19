"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbconfig";
import { toast } from "sonner";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("🖥️");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setamount] = useState();

  const { user } = useUser();

  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast.success("New budget created!");
    }
  };

  const isButtonDisabled = !(name && amount && parseInt(amount, 10) >= 1);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed
                                    border-gray-300 cursor-pointer hover:shadow-lg"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  className="m-5"
                  variant="outline"
                  size="lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g 4000"
                    onChange={(e) => setamount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={isButtonDisabled}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full bg-customRed  text-white font-bold py-2 px"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
