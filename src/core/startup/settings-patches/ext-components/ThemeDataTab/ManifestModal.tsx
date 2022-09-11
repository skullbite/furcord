import { getViaProps, getViaDisplayName, essentials } from "@owo/webpack";
import { ModalComponents, close } from "@owo/modals";
import { ThemeData } from "../../../../managers/themes";

const { React } = essentials;
const { Heading } = getViaProps("Heading");
const { justifyBetween } = getViaProps("justifyBetween", "flex");
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: TextInput } = getViaDisplayName("TextInput");
const { default: Button, ButtonSizes } = getViaProps("ButtonColors", "ButtonLink");

export default class ManifestModal extends React.Component<ThemeData["manifest"], { nameInvalid: boolean, authorInvalid: boolean, descriptionInvalid: boolean }> {
    data: this["props"];
    constructor(props) {
        super(props);
        this.state = {
            nameInvalid: false,
            authorInvalid: false,
            descriptionInvalid: false
        };
        this.data = this.props;
    }
    render() {
        return <>
            <ModalComponents.Header
                align={justifyBetween}
                separator={false}
            >
                <Heading
                    variant="heading-lg/medium"
                >
            Edit Manifest
                </Heading>
                <ModalComponents.CloseButton onClick={ close } />
            </ModalComponents.Header>
       
            <ModalComponents.Content>
                <div style={{ padding: "10px" }}>
                    <FormSection title="Name" error={this.state.nameInvalid ? "Invalid Name" : ""}>
                        <TextInput
                            name="Name"
                            onKeyDown={({ target }) => console.log(target.value)}
                            value={this.data.name}
                        />
                    </FormSection>
                    <FormSection title="Author" {...(this.state.authorInvalid ? { error: "Invalid Author" } : {})}>
                        <TextInput value={this.data.author}/>
                    </FormSection>
                    <FormSection title="Description" {...(this.state.descriptionInvalid ? { error: "Invalid Description" } : {})}>
                        <TextInput value={this.data.description}/>
                    </FormSection>
                </div>
            </ModalComponents.Content>
            <ModalComponents.Footer>
                <Button
                    size={ButtonSizes.MEDIUM}
                    onClick={() => {
                        console.log(this.data);
                    }}
                >
            Confirm
                </Button>
            </ModalComponents.Footer>
        </>;
    }

}

