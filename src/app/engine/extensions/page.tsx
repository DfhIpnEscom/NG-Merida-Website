'use client'

import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import AttributeEditor from "@cloudscape-design/components/attribute-editor";
import Input from "@cloudscape-design/components/input";
import { useState } from "react";
import dynamic from "next/dynamic";
import Select from "@cloudscape-design/components/select";
import ExtensionForm from "./extension-form";

const NoSSRTableComponent = () => {

  const columnsDefinitions = [
    {
      id: "extension",
      header: "Extension",
      cell: item => item.extension,
    },
    {
      id: "password",
      header: "Pasword",
      cell: item => item.passowrd,
    },
    {
      id: "label",
      header: "Label",
      cell: item => item.label,
    },
  ];

  const mockData = [
    {
      extension: '12345',
      passowrd: '98765',
      label: 'Agent'
    },
    {
      extension: '12345',
      passowrd: '98765',
      label: 'Supervisor'
    },
    {
      extension: '12345',
      passowrd: '98765',
      label: 'Agent'
    }
  ];

  

  return (
    <SpaceBetween direction="vertical" size="l">
      <Table
        header={<Header> Manage Extensions </Header>}
        loadingText="Loading resources"
        sortingDisabled
        columnDefinitions={columnsDefinitions}
        items={mockData}
      />
      <ExtensionForm />
    </SpaceBetween>
  );
}

const Page = dynamic(() => Promise.resolve(NoSSRTableComponent), {
  ssr: false,
})

export default Page