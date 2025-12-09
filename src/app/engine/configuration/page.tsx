'use client'

import * as React from "react";

import SpaceBetween from "@cloudscape-design/components/space-between";
import AEServiceConfiguration from "./ae-service-configuration";
import EnginesCollection from "./engines-collection";

export default function Page() {
  return (
    <SpaceBetween direction="vertical" size="l">
        <AEServiceConfiguration />
        <EnginesCollection />
    </SpaceBetween>
  );
};




