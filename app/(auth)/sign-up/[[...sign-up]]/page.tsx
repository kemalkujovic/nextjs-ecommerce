import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center p-4 min-h-[90vh]">
      <SignUp
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
            rootBox: {
              "@media (max-width: 640px)": {
                width: "100%",
                ".cl-internal-105jsc1": {
                  width: "100%",
                },
              },
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
