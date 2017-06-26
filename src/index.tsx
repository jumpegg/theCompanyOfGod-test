import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./component/hello";

ReactDOM.render(
	<Hello compiler="TypeScript" framework="React"></Hello>,
	document.getElementById("example")
);