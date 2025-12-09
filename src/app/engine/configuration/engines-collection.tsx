'use client'

import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Link from "@cloudscape-design/components/link";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import SpaceBetween from "@cloudscape-design/components/space-between";
import KeyValuePairs from "@cloudscape-design/components/key-value-pairs";
import Badge from "@cloudscape-design/components/badge";
import { useEffect, useState } from "react";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import Box from "@cloudscape-design/components/box";

export default function EnginesCollection(){
    const [loading, setLoading] = useState(true);
    const [configuredEngines, setConfiguredEngines] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          fetch('http://localhost:5230/configuration/engines')
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
              setConfiguredEngines(data.engines);
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

    return(
         <Cards
          cardDefinition={{
            header: item => (
              <div>
                <Box float="left" >
                  <SpaceBetween direction="horizontal" size="xs">
                    <Link href="#" fontSize="heading-m">
                      {item.engineId}
                    </Link>
                    <Box variant="h5">
                      ({item.totalExtensions})
                    </Box>
                    <Box margin="xxxs" padding="xxs">
                      <StatusIndicator type="pending">
                        {item.status}
                      </StatusIndicator>
                    </Box>
                  </SpaceBetween>
                </Box>
                <Box float="right">
                  <ButtonDropdown
                    items={[
                      { id: "start", text: "Start" },
                      { id: "stop", text: "Stop" },
                      { id: "restart", text: "Restart" },
                    ]}
                    ariaLabel="Control instance"
                    variant="icon"
                  />
                </Box>
              </div>
            ),
            sections: [
              {
                id: "sessionId",
                header: "Session Id",
                content: item => item.sessionId
              },
              {
                id: "details",
                header: "Extension Details",
                content: (
                  item => (
                    <KeyValuePairs
                    columns={2}
                    items={[
                        { label: "Connected", value: (<Badge color="green">{item.connectedExtensions}</Badge>) },
                        { label: "On Error", value: (<Badge color="red">{item.onErrorExtensions}</Badge>) },
                    ]}
                  />
                  )
                )
              }
            ]
          }}
          cardsPerRow={[
            { cards: 1 },
            { minWidth: 500, cards: 3 }
          ]}
          items={configuredEngines}
          loading={loading}
          loadingText="Loading resources"
        />
    );
}