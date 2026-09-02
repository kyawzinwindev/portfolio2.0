import React from "react";
import { getSiteSettings } from "../actions";
import { getSessionUser } from "@/lib/auth";
import SettingsClient from "./SettingsClient";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const [settings, user] = await Promise.all([
    getSiteSettings(),
    getSessionUser(),
  ]);

  return (
    <SettingsClient
      initialSettings={settings}
      userEmail={user?.email || "kyawzinw469@gmail.com"}
    />
  );
}
