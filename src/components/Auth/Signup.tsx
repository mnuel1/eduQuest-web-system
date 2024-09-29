/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { IconBrandGoogle } from "@tabler/icons-react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { x: 50, opacity: 0, scale: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 12 },
  },
  exit: { x: -50, opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const Signup: React.FC = () => {
  const { signUp, googleSignUp } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await signUp(data.email, data.password);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignUp();
      toast.success("Successfully signed up with Google!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="mt-8 grid h-[calc(100%-8rem)] items-center gap-8 md:mt-14 md:grid-cols-[1fr_0.8fr] md:gap-16"
    >
      <motion.div className="h-full w-full" variants={itemVariants}>
        <motion.img
          src="https://placehold.co/600x400"
          alt="Signup visual"
          className="hidden h-full w-full rounded-xl object-cover md:block"
          variants={itemVariants}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.div variants={containerVariants}>
          <motion.h1
            className="text-lg font-semibold text-purple-700"
            variants={itemVariants}
          >
            EduQuest
          </motion.h1>

          <motion.div variants={itemVariants}>
            <h2 className="text-5xl font-bold md:text-7xl">
              Let's get started
            </h2>
            <div className="flex items-center gap-1 text-sm opacity-60">
              <p>Already have an account? Let's</p>
              <NavLink to="/login">
                <Button variant={"link"} className="h-fit p-0">
                  Login!
                </Button>
              </NavLink>
            </div>
          </motion.div>
        </motion.div>

        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={(e) => {
                  handleGoogleSignIn();
                  e.preventDefault();
                }}
                className="flex w-full gap-2"
                variant={"outline"}
              >
                <IconBrandGoogle />
                Sign up with Google
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
