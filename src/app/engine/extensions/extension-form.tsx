import AttributeEditor from "@cloudscape-design/components/attribute-editor";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import { useCallback, useState } from "react";
import { addButton, cleanButton, emptyStateLabel, extensionLabel, extensionPlaceholder, headerDescription, headerTitle, passwordLabel, passwordPlaceholder, removeButton, saveButton, selectLabel, selectPlaceholder, unknownLabel } from "./strings";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { Extension, ExtensionType, resourceTypeOptions } from "./interfaces";


export default function ExtensionForm(){
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const hasErrors = extensions.some((item) => {
        return !item.extensionId || !item.password;
    });
    const disableActions = hasErrors || extensions.length === 0;

    const updateExtensionField = (item:Extension, field:string, value:string) => {
        const updateResources = [...extensions];
        updateResources[item.key] = {
            ...item,
            [field]: value
        };
        setExtensions(updateResources);
    };
    
    const removeExtension = useCallback(({ detail: { itemIndex } }) => {
        const tmpItems = extensions.filter((_, idx) => idx !== itemIndex);
        const newExtensions = tmpItems.map((item, idx) => { 
            return {
                ...item,
                index: idx
            };
        });
        console.log("Items after removal:", newExtensions);
        setExtensions(newExtensions);
    }, [extensions]);

    const saveExtensions = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(extensions)
        };
        fetch("http://localhost:5230/extensions", requestOptions)
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

    const header = (
       <div>
            <Box float="left">
                <Header
                    variant="h2"
                    description={headerDescription}
                >
                    {headerTitle}
                </Header>
            </Box>
            <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                    <Button disabled={disableActions} onClick={() => setExtensions([])} >{cleanButton}</Button>
                    <Button disabled={disableActions} variant="primary" onClick={() => saveExtensions()}>
                    {saveButton}
                    </Button>
                </SpaceBetween>
            </Box>
       </div>
    );

    const formDefinition = [
        {
            label: extensionLabel,
            control: (item:Extension) => {
                const [extension , setExtension] = useState(item.extensionId);
                return (
                    <Input
                        value={extension}
                        placeholder={extensionPlaceholder}
                        type="text"
                        onChange={({ detail }) => {
                            const value = detail.value.replace(/[^0-9]/g, '');
                            updateExtensionField(item, 'extensionId', value);
                            setExtension(value)
                        }}
                    />
                );
            },
            errorText: (item:Extension) => !item.extensionId ? "Error message" : null
        },
        {
            label: passwordLabel,
            control: (item:Extension) => {
                const [password , setPassword] = useState(item.password);
                return (
                    <Input
                        value={password}
                        placeholder={passwordPlaceholder}
                        onChange={({ detail }) => {
                            updateExtensionField(item, 'password', detail.value);
                            setPassword(detail.value)
                        }}
                    />
                );
            },
            errorText: (item:Extension) => !item.password ? "Error message" : null
        },
        {
            label: selectLabel,
            control: (item:Extension) => {
                const extensionType = resourceTypeOptions.find(option => option.label === item.label);
                const [selectedType, setSelectedType ] = useState(extensionType);
                return (
                    <Select
                        selectedOption={selectedType}
                        options={resourceTypeOptions}
                        placeholder={selectPlaceholder}
                        onChange={({ detail }) => {
                            const label = (detail.selectedOption as ExtensionType).label;
                            updateExtensionField(item, 'label', label);
                            setSelectedType(detail.selectedOption)
                        }}
                    />
                );
            }
        }
    ];

    return (
        <Container
            header={header}
        >
        <AttributeEditor
            disableAddButton={hasErrors}
            onAddButtonClick={() => {
                const newResource:Extension = {
                    extensionId: '',
                    password: '',
                    label: unknownLabel,
                    key: extensions.length
                };
                setExtensions([...extensions, newResource]);
            }}
            onRemoveButtonClick={removeExtension}
            removeButtonText= {removeButton}
            items={extensions}
            addButtonText={addButton}
            definition={formDefinition}
            empty={emptyStateLabel}
        />
      </Container>
    );
}; 