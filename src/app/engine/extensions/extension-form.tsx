import AttributeEditor from "@cloudscape-design/components/attribute-editor";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import { useCallback, useState } from "react";

// interface ExtensionType {
//     label: string;
//     value: string;
// };

// interface Resource {
//     extension: string;
//     password: string;
//     type: ExtensionType;
//     index: number;
// };

export default function ExtensionForm(){
    const header = (
        <Header
            variant="h2"
            description="Configure extensions, password and sort of extension"
        >
            Configure Extension
        </Header>
    );

    const updateResourceField = (item, field, value) => {
        const updateResources = [...resources];
        updateResources[item.index] = {
            ...item,
            [field]: value
        };
        setResources(updateResources);
    };

    const formDefinition = [
        {
            label: "Extension",
            control: (item) => {
                const [extension , setExtension] = useState(item.extension);
                return (
                    <Input
                        value={extension}
                        placeholder="Enter extension"
                        type="text"
                        onChange={({ detail }) => {
                            const value = detail.value.replace(/[^0-9]/g, '');
                            updateResourceField(item, 'extension', value);
                            setExtension(value)
                        }}
                    />
                );
            }
        },
        {
            label: "Password",
            control: (item) => {
                const [password , setPassword] = useState(item.password);
                return (
                    <Input
                        value={password}
                        placeholder="Enter password"
                        onChange={({ detail }) => {
                            updateResourceField(item, 'password', detail.value);
                            setPassword(detail.value)
                        }}
                    />
                );
            }
        },
        {
            label: "Type",
            control: (item) => {
                const [selectedType, setSelectedType ] = useState(item.type);
                return (
                    <Select
                        selectedOption={selectedType}
                        options={[
                            { label: "Agent", value: "0" },
                            { label: "Supervisor", value: "1" },
                            { label: "Unknown", value: "2" }
                        ]}
                        placeholder="Select type of extension"
                        onChange={({ detail }) => {
                            updateResourceField(item, 'type', detail.selectedOption);
                            setSelectedType(detail.selectedOption)
                        }}
                    />
                );
            }
        }
    ];

    const [index, setIndex] = useState(0);

    const [resources, setResources] = useState([]);
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
                const newResource = {
                    extension: '',
                    password: '',
                    type: { label: "Unknown", value: "2" },
                    index: index
                };
                setIndex(index + 1);
                setResources([...resources, newResource]);
            }}
            onRemoveButtonClick={removeExtension}
            removeButtonText='Remove'
            items={resources}
            addButtonText="Add new extension"
            definition={formDefinition}
            empty="No items associated with the resource."
        />
      </Container>
    );
}; 