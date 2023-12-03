import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignIn
        appearance={{
          variables: {
            colorBackground: "#19191A",
            colorInputBackground: "#19191A",
            colorAlphaShade: "white",
            colorText: "white",
            colorInputText: "white",
          },
          elements: {
            logoImage: {},
            socialButtonsProviderIcon__github: {
              filter: "brightness(0) invert(1)",
            },
            footer: {
              "& + div": {
                background: "rgb(49, 49, 51)",
              },
            },
          },
        }}
      />
    </div>
  );
}
