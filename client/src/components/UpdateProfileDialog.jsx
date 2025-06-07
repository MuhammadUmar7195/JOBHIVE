import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogClose,
  DialogDescription,
} from "./ui/dialog";
import { useSelector } from "react-redux";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [data, setData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: Array.isArray(user?.profile?.skills)
      ? user.profile.skills.join(", ")
      : user?.profile?.skills || "",
    file: user?.profile?.resume || "",
  });

  const changeEventHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setData({ ...data, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      alert("Implement later");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg rounded-2xl shadow-2xl border border-gray-100 bg-white">
        <div className="flex items-center justify-between mb-2">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F83002]">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {/*I use to remove warning on console so ignore it*/}
          </DialogDescription>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right font-semibold text-[#6A38C2]"
              >
                Name
              </Label>
              <Input
                id="name"
                name="fullname"
                type="text"
                value={data.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="email"
                className="text-right font-semibold text-[#6A38C2]"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={changeEventHandler}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="number"
                className="text-right font-semibold text-[#6A38C2]"
              >
                Number
              </Label>
              <Input
                id="number"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="bio"
                className="text-right font-semibold text-[#6A38C2]"
              >
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={data.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="skills"
                className="text-right font-semibold text-[#6A38C2]"
              >
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={data.skills}
                onChange={changeEventHandler}
                className="col-span-3"
                placeholder="e.g. React, Node, MongoDB"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="file"
                className="text-right font-semibold text-[#6A38C2]"
              >
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-[#F83002] hover:bg-[#d72600] text-white font-semibold rounded-full cursor-pointer"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
