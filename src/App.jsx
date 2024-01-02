import Form from "./Form";
import List from "./List";
import { CssVarsProvider, useColorScheme, Button } from "@mui/joy";
import React from "react";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      sx={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: "1000",
      }}
      color="primary"
      size="sm"
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

function App() {
  return (
    <CssVarsProvider>
      <ModeToggle />
      {/* <Form /> */}
      <List/>
    </CssVarsProvider>
  );
}

export default App;
