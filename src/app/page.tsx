"use client";

import { NavbarDefault } from "@/Components/NavBar";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col p-8 pb-48">
        <NavbarDefault />
        <div className="flex justify-center items-center pt-12 lg:pt-40 align-top">
          <div className="lg:text-5xl text-2xl font-semibold max-w-xl text-center h-full text-primary">
            Welcome to StarSeeker Gate Agent
          </div>
        </div>
      </div>
    </>
  );
}
