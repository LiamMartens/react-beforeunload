# react-beforeunload
React component which listens to `beforeunload` on the window when mounted but can also block `react-router`.

## Props
* `message`: The message to show when blocking the browser/router. Will not work for `beforeunload` in every browser.
* `enableUnload`: Enables the unload listener (defaults to  `true`)
* `enableRouter`: Enables the router listener (defaults to `true`)
* `path`: The path to match against when checking whether to block the routing (defaults to the current location, probably not intended behavior)
* `exact`: Whether the router listener should block routing to non-exact paths (defaults to `true`)

## Usage
```
import BeforeLeave from 'react-before-leave';

<BeforeLeave
    message="Are you sure you want to leave?"
    enableUnload={true}
    enableRouter={true}
    path="mypath"
    exact={true}
/>
```