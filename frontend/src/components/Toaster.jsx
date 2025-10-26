import {Toaster} from "react-hot-toast";

function ToasterProvider(
    {
        position = "top-right",
        gutter = 12,
        containerStyle = {},
        toastOptions = {}
    }
    ) {
    return (
        <Toaster
        position={position}
        gutter={{gutter}}
        containerStyle={containerStyle}
        toastOptions={{
            ...toastOptions,
            success: {
                duration: 3000,
                style: {
                    background: "#73d813",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "500",
                },
                iconTheme: {
                    primary: "#ffffff",
                    secondary: "#73d813",
                },
            },
            error: {
                duration: 5000,
                style: {
                    background: "#e50001",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "500",
                },
                iconTheme: {
                    primary: "#ffffff",
                    secondary: "#e50001",
                },
            },
            loading: {
                style: {
                    background: "#1c1646",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "500",
                },
            },
        }}
    />
    );
}

export default ToasterProvider;