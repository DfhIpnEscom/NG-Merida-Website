import { agentLabel, supervisorLabel, unknownLabel } from "./strings"

export interface Extension {
    extensionId: string,
    password: string,
    label: string,
    key: number
}

export interface ExtensionType {
    label: string,
    value: string
}

export const resourceTypeOptions:ResourceType[] = [
    { label: agentLabel, value: "0" },
    { label: supervisorLabel, value: "1" },
    { label: unknownLabel, value: "2" }
]
