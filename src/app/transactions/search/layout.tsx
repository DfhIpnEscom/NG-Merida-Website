'use client'

import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";

export default function TransactionsSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Container Transactions Search"
        >
          Transactions Search
        </Header>
      }
    >
      {children}
    </Container>
  );
};