'use client'

import * as React from "react";
import Table from "@cloudscape-design/components/table";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ExtensionForm from "./extensions-configuration";
import Box from "@cloudscape-design/components/box";
import ExtensionsConfiguration from "./extensions-configuration";
import StatusIndicator from "@cloudscape-design/components/status-indicator";

const NoSSRTableComponent = () => {

  const columnDefinitions = [
    {
      id: "extension",
      header: "Extension",
      cell: item => item.extensionId,
    },
    {
      id: "password",
      header: "Pasword",
      cell: item => item.password,
    },
    {
      id: "label",
      header: "Label",
      cell: item => item.label,
    },
    {
      id: "status",
      header: "Status",
      cell: item => 
      (
        <StatusIndicator type="pending">
          {item.status}
        </StatusIndicator>
      ),
    },
    {
      id: "engineId",
      header: "EngineId",
      cell: item => item.engineId,
    }
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // const res = await fetch('http://localhost:5230/extensions'); // Or an external API
      // const result = await res.json();
      // setData(result);
      // setLoading(false);
      try {
        fetch('http://localhost:5230/extensions')
          .then(response => {
            // Check if the request was successful (e.g., status code 200-299)
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the response body as JSON
            return response.json();
          })
          .then(data => {
            // Handle the fetched data
            setData(data);
            setLoading(false);
          })
          .catch(error => {
            // Handle any errors that occurred during the fetch operation
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      } catch (error) {
        console.error('Unexpected error:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  

  return (
    <SpaceBetween direction="vertical" size="l">
      <Table
        header={<Header> Manage Extensions </Header>}
        loadingText="Loading resources"
        sortingDisabled
        columnDefinitions={columnDefinitions}
        items={data}
        loading={loading}
        empty={
          <Box
            margin={{ vertical: "xs" }}
            textAlign="center"
            color="inherit"
          >
            <SpaceBetween size="m">
              <b>No resources</b>
            </SpaceBetween>
          </Box>
        }
      />
      <ExtensionsConfiguration />
    </SpaceBetween>
  );
}

const Page = dynamic(() => Promise.resolve(NoSSRTableComponent), {
  ssr: false,
})

export default Page