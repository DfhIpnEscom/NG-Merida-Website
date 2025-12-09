'use client'

import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Input from "@cloudscape-design/components/input";
import { useState } from "react";
import Spinner from "@cloudscape-design/components/spinner";

interface EditFieldProps {
    initialValue: string;
    setFieldValue: (value: string) => void;
    isLoading?: boolean;
};

export default function EditField({initialValue, setFieldValue, isLoading}: EditFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("");

    const displayMode = (
        <SpaceBetween direction="horizontal" size="xs">
            <Box color="text-body-secondary" margin="xxxs" padding="xxs">{initialValue}</Box>
            <Button 
                iconName="edit" 
                variant="link" 
                onClick={() => {
                    setIsEditing(true);
                    setValue(initialValue);
                }}
            />
        </SpaceBetween>
    );

    const editMode = (
        <SpaceBetween direction="horizontal" size="xs">
            <Input
                onChange={({ detail }) => setValue(detail.value)}
                value={value}
            />
            <Button iconName="check" variant="primary" onClick={() => saveValue()}/>
            <Button iconName="close" variant="normal" onClick={() => setIsEditing(false)}/>
        </SpaceBetween>
    );

    const saveValue = () => {
        // Here you can add logic to save the value, e.g., make an API call
        setFieldValue(value);
        setIsEditing(false);
    }

    return (
        isLoading ? <Spinner /> :
        (isEditing ? editMode : displayMode)
    );
};