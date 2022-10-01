import { getViaProps, getViaDisplayName, essentials } from "@owo/webpack";
import { ModalComponents, close } from "@owo/modals";
import { ThemeData } from "../../../../managers/themes";

const { React } = essentials;
const { Heading } = getViaProps("Heading");
const { justifyBetween } = getViaProps("justifyBetween", "flex");
const { default: TextInput } = getViaDisplayName("TextInput");
const { default: Button, ButtonSizes } = getViaProps("ButtonColors", "ButtonLink");
const { default: FormItem } = getViaDisplayName("FormItem");

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
                    <TextInput
                        name="Name"
                        onKeyDown={({ target }) => console.log(target.value)}
                        value={this.data.name}
                        editable={true}
                    />

                    <FormItem title="Name" error={this.state.nameInvalid ? "Invalid Name" : undefined}>
                        <TextInput
                            name="Name"
                            onKeyDown={({ target }) => console.log(target.value)}
                            value={this.data.name}
                        />
                    </FormItem>
                    <FormItem title="Author" {...(this.state.authorInvalid ? { error: "Invalid Author" } : {})}>
                        <TextInput value={this.data.author}/>
                    </FormItem>
                    <FormItem title="Description" {...(this.state.descriptionInvalid ? { error: "Invalid Description" } : {})}>
                        <TextInput value={this.data.description}/>
                    </FormItem>
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

