import { getViaProps, getViaDisplayName, essentials } from "@owo/webpack";
import { ModalComponents } from "@owo/modals";
import { ThemeData } from "src/core/managers/themes";

const { React } = essentials;
const { Heading } = getViaProps("Heading");
const { justifyBetween } = getViaProps("justifyBetween", "flex");
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: TextInput } = getViaDisplayName("TextInput");
const { default: Button, ButtonSizes } = getViaProps("ButtonColors", "ButtonSizes");

export default class ManifestModal extends React.Component {
    override state: {
        nameInvalid: boolean,
        authorInvalid: boolean,
        descriptionInvalid: boolean
    };
    override props: ThemeData["manifest"];
    constructor(props) {
        super(props);
        this.state = {
            nameInvalid: false,
            authorInvalid: false,
            descriptionInvalid: false
        };
    }
    render() {
        const { name, author, description } = this.props;
        return <>
            <ModalComponents.Header
                align={justifyBetween}
            >
                <Heading
                    variant="heading-lg/medium"
                >
            Edit Manifest
                </Heading>
                <ModalComponents.CloseButton/>
            </ModalComponents.Header>
       
            <ModalComponents.Content>
                <FormSection title="Name" error={this.state.nameInvalid ? "Invalid Name" : ""}>
                    <TextInput {...TextInput.defaultProps} value={name}/>
                </FormSection>
                <FormSection title="Author" {...(this.state.authorInvalid ? { error: "Invalid Author" } : {})}>
                    <TextInput {...TextInput.defaultProps} value={author}/>
                </FormSection>
                <FormSection title="Description" {...(this.state.descriptionInvalid ? { error: "Invalid Description" } : {})}>
                    <TextInput {...TextInput.defaultProps} value={description}/>
                </FormSection>
            </ModalComponents.Content>
            <ModalComponents.Footer>
                <Button
                    size={ButtonSizes.MEDIUM}
                    onClick={() => {}}
                >
            Confirm
                </Button>
            </ModalComponents.Footer>
        </>;
    }

}

