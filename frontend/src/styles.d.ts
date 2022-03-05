import {} from "styled-components/cssprop";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontWeight: {
      small: string;
      medium: string;
      large: string;
    };
    fontSize: {
      small: string;
      medium: string;
    };
    padding: {
      small: string;
      medium: string;
    };
    margin: {
      tiny: string;
      small: string;
      medium: string;
    };
    roundButtonSize: {
      small: string;
      medium: string;
      large: string;
      huge: string;
    };
    sizes: {
      headerHeight: string;
      footerHeight: string;
      maxWidth: string;
      roundButtonSize: string;
      small: string;
      medium: string;
      large: string;
    };
    colors: {
      backgroundColor: string;
      fontColor: string;
      secondaryFontColor: string;
      shadowColor: string;
      listBackgroundColor: string;
      primary: string;
      danger: string;
    };
  }
}
