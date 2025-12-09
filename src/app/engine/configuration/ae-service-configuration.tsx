'use client'

import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import KeyValuePairs from "@cloudscape-design/components/key-value-pairs";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from "@cloudscape-design/components/box";
import EditField from "./edit-field";
import { useEffect, useState } from "react";
import Select from "@cloudscape-design/components/select";
import Badge from "@cloudscape-design/components/badge";

export default function AEServiceConfiguration() {

    const protocolOptions = [
      { label: "Release 5.2", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/priv4" },
      { label: "Release 6.1", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/priv5" },
      { label: "Release 6.2", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/priv6" },
      { label: "Release 6.3", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/priv7" },
      { label: "Release 6.3.1", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/priv8" },
      { label: "Release 6.3.3", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/priv9" },
      { label: "Release 7.0.0", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/privA" },
      { label: "Release 8.0.1", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/privC" },
    ];
    const [
      selectedOption,
      setSelectedOption
    ] = useState({ label: "Release 8.0.1", value: "http://www.ecma-international.org/standards/ecma-323/csta/ed3/privC" });

    const [aeServiceHost, setAEServiceHost] = useState("");
    const [aeServicePort, setAEServicePort] = useState("");
    const [sessionName, setSessionName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [extensionDetails, setExtensionDetails] = useState(
      {
        totalExtensions: 0,
        connectedExtensions: 0,
        onErrorExtensions: 0,
        pendingExtensions: 0
      }
    );

    useEffect(() => {
      async function fetchData() {
        try {
          fetch('http://localhost:5230/configuration')
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
              setAEServiceHost(data.aeServiceHost);
              setAEServicePort(data.aeServicePort);
              setSelectedOption(protocolOptions.find(option => option.value === data.protocolVersion) || protocolOptions[0]);
              setSessionName(data.sessionName);
              setUserName(data.userName);
              setPassword(data.password);
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

    useEffect(() => {
      async function fetchData() {
        try {
          fetch('http://localhost:5230/extensions/details')
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
              setExtensionDetails(data);
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

    const saveConfiguration = () => {
      const configuration = {
        aeServiceHost,
        aeServicePort,
        protocolVersion: selectedOption.value,
        sessionName,
        userName,
        password
      }
      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(configuration)
      };
      setLoading(true);
      fetch("http://localhost:5230/configuration", requestOptions)
      .then(response => {
          // Check if the response is successful (e.g., status 200-299)
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Parse the response body as JSON
          return response.json();
      })
      .then(responseData => {
          console.log('Success:', responseData);
          setLoading(false);
      })
      .catch(error => {
          console.error('Error:', error);
          setLoading(false);
      });
    };

    const loadPendingExtensions = () => {
      const requestOptions = {
          method: 'POST',
      };
      fetch("http://localhost:5230/configuration/loadPendingExtensions", requestOptions)
      .then(response => {
          // Check if the response is successful (e.g., status 200-299)
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Parse the response body as JSON
          return response.json();
      })
      .then(responseData => {
          console.log('Success:', responseData);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    };

    return (
        <Container
          header={
            <div>
              <Box float="left">
                  <Header
                    variant="h2"
                    description="Avaya AE Service Configuration"
                  >
                    Engine Configuration
                  </Header>
              </Box>
              <Box float="right">
                  <SpaceBetween direction="horizontal" size="xs">
                      <Button variant="primary" onClick={() => saveConfiguration()} loading={loading}>
                        Save Configuration
                      </Button>
                      <Button onClick={() => loadPendingExtensions()}>
                        Load Pending Extensions
                      </Button>
                  </SpaceBetween>
              </Box>
            </div>
          }
        >
          <SpaceBetween direction="vertical" size="l">
            <KeyValuePairs
              columns={3}
              items={[
                {
                  type: "group",
                  title: "AE Service Conection Details",
                  items: [
                      { label: "AE Service Host", value: <EditField initialValue={aeServiceHost} setFieldValue={setAEServiceHost} isLoading={loading}/>},
                      { label: "AE Service Port", value: <EditField initialValue={aeServicePort} setFieldValue={setAEServicePort} isLoading={loading}/>},
                  ]
                },
                {
                  type: "group",
                  title: "Session Configuration",
                  items: [
                      {
                          label: "Protocol Version",
                          value: (
                            <Select
                              selectedOption={selectedOption}
                              onChange={({ detail }) =>
                                setSelectedOption(detail.selectedOption)
                              }
                              options={protocolOptions}
                              disabled={loading}
                            />
                          )
                          
                      },
                      {
                          label: "Session Name",
                          value: <EditField initialValue={sessionName} setFieldValue={setSessionName} isLoading={loading}/>
                      },
                  ]
                },
                {
                  type: "group",
                  title: "Login Credentials",
                  items: [
                    {
                        label: "Username",
                        value: <EditField initialValue={userName} setFieldValue={setUserName} isLoading={loading}/>
                    },
                    {
                        label: "Password",
                        value: <EditField initialValue={password} setFieldValue={setPassword} isLoading={loading}/>
                    },
                  ]
                },

              ]}
            />
            <Box variant="h3">
              Extensions Configured
            </Box>
            <KeyValuePairs
              columns={4}
              items={[
                  { label: "Total", value: (<Badge color="blue">{extensionDetails.totalExtensions}</Badge>) },
                  { label: "Connected", value: (<Badge color="green">{extensionDetails.connectedExtensions}</Badge>) },
                  { label: "On Error", value: (<Badge color="red">{extensionDetails.onErrorExtensions}</Badge>) },
                  { label: "Pending to load", value: (<Badge>{extensionDetails.pendingExtensions}</Badge>) },
              ]}
            />
          </SpaceBetween>
        </Container>
    );
}
