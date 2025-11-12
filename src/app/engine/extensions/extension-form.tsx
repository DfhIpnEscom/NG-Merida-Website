import AttributeEditor from "@cloudscape-design/components/attribute-editor";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import { useCallback, useState } from "react";
import { addButton, agentLabel, cleanButton, emptyStateLabel, extensionLabel, extensionPlaceholder, headerDescription, headerTitle, passwordLabel, passwordPlaceholder, removeButton, saveButton, selectLabel, selectPlaceholder, unknownLabel } from "./strings";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";


export default function ExtensionForm(){
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
                    <Button>{cleanButton}</Button>
                    <Button variant="primary">
                    {saveButton}
                    </Button>
                </SpaceBetween>
            </Box>
       </div>
    );

    const updateResourceField = (item:Resource, field:string, value:string|ResourceType) => {
        const updateResources = [...resources];
        updateResources[item.index] = {
            ...item,
            [field]: value
        };
        setResources(updateResources);
    };

    const formDefinition = [
        {
            label: extensionLabel,
            control: (item:Resource) => {
                const [extension , setExtension] = useState(item.extension);
                return (
                    <Input
                        value={extension}
                        placeholder={extensionPlaceholder}
                        type="text"
                        onChange={({ detail }) => {
                            const value = detail.value.replace(/[^0-9]/g, '');
                            updateResourceField(item, 'extension', value);
                            setExtension(value)
                        }}
                    />
                );
            },
            errorText: (item:Resource) => !item.extension ? "Error message" : null
        },
        {
            label: passwordLabel,
            control: (item:Resource) => {
                const [password , setPassword] = useState(item.password);
                return (
                    <Input
                        value={password}
                        placeholder={passwordPlaceholder}
                        onChange={({ detail }) => {
                            updateResourceField(item, 'password', detail.value);
                            setPassword(detail.value)
                        }}
                    />
                );
            },
            errorText: (item:Resource) => !item.password ? "Error message" : null
        },
        {
            label: selectLabel,
            control: (item:Resource) => {
                const [selectedType, setSelectedType ] = useState(item.type);
                return (
                    <Select
                        selectedOption={selectedType}
                        options={[
                            { label: agentLabel, value: "0" },
                            { label: passwordLabel, value: "1" },
                            { label: unknownLabel, value: "2" }
                        ]}
                        placeholder={selectPlaceholder}
                        onChange={({ detail }) => {
                            updateResourceField(item, 'type', detail.selectedOption as ResourceType);
                            setSelectedType(detail.selectedOption)
                        }}
                    />
                );
            }
        }
    ];

    const [index, setIndex] = useState(0);

    const [resources, setResources] = useState<Resource[]>([]);
    const removeExtension = useCallback(({ detail: { itemIndex } }) => {
        const tmpItems = [...resources];
        tmpItems.splice(itemIndex, 1);
        setResources(tmpItems);
    }, [resources]);

    return (
        <Container
            header={header}
        >
        <AttributeEditor
            onAddButtonClick={() => {
                const newResource:Resource = {
                    extension: '',
                    password: '',
                    type: { label: "Unknown", value: "2" },
                    index: index
                };
                setIndex(index + 1);
                setResources([...resources, newResource]);
            }}
            onRemoveButtonClick={removeExtension}
            removeButtonText= {removeButton}
            items={resources}
            addButtonText={addButton}
            definition={formDefinition}
            empty={emptyStateLabel}
        />
      </Container>
    );
}; 