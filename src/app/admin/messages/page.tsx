import React from "react";
import { getContactMessages } from "../actions";
import MessagesClient from "./MessagesClient";

export const revalidate = 0;

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const status = sp.status || "ALL";
  const messages = await getContactMessages(status);

  return <MessagesClient initialMessages={messages} />;
}
