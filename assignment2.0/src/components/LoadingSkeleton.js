"use client";

import { Card, CardContent, Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Card sx={{ mb: 2, p: 1 }}>
      <CardContent>
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
}
