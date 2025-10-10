'use client'

import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";

export default function UserAccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Container Users Accounts"
        >
          Extensions
        </Header>
      }
    >
      {children}
    </Container>
  );
};