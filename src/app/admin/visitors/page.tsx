import React from "react";
import { getVisitorLogs } from "../actions";
import VisitorsClient from "./VisitorsClient";

export const revalidate = 0;

export default async function AdminVisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const sp = await searchParams;
  const page = parseInt(sp.page || "1", 10);
  const search = sp.search || "";

  const data = await getVisitorLogs(page, 50, search);

  return (
    <VisitorsClient
      initialLogs={data.logs}
      total={data.total}
      page={data.page}
      totalPages={data.totalPages}
      deviceCounts={data.deviceCounts}
    />
  );
}
