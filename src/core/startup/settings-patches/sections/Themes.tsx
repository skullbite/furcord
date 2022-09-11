import Furcord from "../../../furcord";
import DataTab from "../ext-components/ThemeDataTab";
import { getViaDisplayName, getViaProps, essentials } from "@owo/webpack";
import { sendToast } from "@owo/toaster";

const { React, ThemeStore } = essentials;
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: TextInput } = getViaDisplayName("TextInput");
const { default: Divider } = getViaDisplayName("FormDivider");
const { marginBottom20, marginTop20 } = getViaProps("marginBottom40");
const { default: EmptyState } = getViaProps("EmptyStateText"); 
const { default: Spinner } = getViaDisplayName("Spinner");
const { default: Button, ButtonSizes } = getViaProps("Sizes", "Looks", "Hovers", "Colors");

export default function(this: Furcord) {
    const { themes } = this.managers;
    const _DataTab = DataTab(this.managers.themes);

    // eslint-disable-next-line @typescript-eslint/ban-types
    return class ThemeSettings extends React.PureComponent<{}, { addingTheme: boolean }> {
        constructor(props) {
            super(props);
            this.state = {
                addingTheme: false
            };
        }
        render() {
            return <FormSection
                title="Themes"
                tag="h1"
            >
                <div style={{ display: "flex" }}>
                    <TextInput
                        className={`themeInput${this.state.addingTheme ? " processing" : " "}`}
                        placeholder="Add theme via URL"
                        disabled={this.state.addingTheme}
                        onKeyDown={({ target, key }) => {
                            if (key !== "Enter") return;
                            let caught = false;
                            this.setState({ addingTheme: true });
                            themes.addThemeFromUrl(target.value)
                                .catch(e => { 
                                    sendToast(e.message, 2, {});
                                    caught = true;
                                })
                                .finally(() => {
                                    target.value = "";
                                    this.setState({ addingTheme: false });
                                    if (!caught) {
                                        this.forceUpdate();
                                        sendToast("Theme successfully added!", 1, {}); 
                                    }
                                });
                        }}
                    />
                    { this.state.addingTheme ? <div className="cubes"><Spinner/></div> : null }
                    <Button
                        size={ButtonSizes.MEDIUM}
                    >
                    Reload Local Themes
                    </Button>

                </div>
                
                
                
                <Divider className={[marginBottom20, marginTop20].join(" ")}/>
                { themes.themes.length ? themes.themes.map((t, i) => <_DataTab key={i} theme={t} callback={this.forceUpdate.bind(this)}/>) : <EmptyState theme={ThemeStore.default.theme}>
                    <EmptyState.Image
                        width={433}
                        height={232}
                        lightSrc="/assets/645df33d735507f39c78ce0cac7437f0.svg"
                        darkSrc="/assets/8c998f8fb62016fcfb4901e424ff378b.svg"
                    />
                    <EmptyState.Text note="Not a theme in sight..."/>
                </EmptyState> }
            </FormSection>;
        }
    };
}