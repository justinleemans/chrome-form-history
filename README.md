# Form History Chrome extension

Form History is a Chrome extension to manage and restore form entries. This project allows you to quickly resubmit forms with the same data as before which is great for testing purposes. The extension stores all submission into a local storage so your data is not stored in a cloud somewhere and is completely save.

The project is build with a combination of Vite + Vue.js. Where Vite serves as the bundler to package all the code into an extension and Vue.js is used for the popup.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [User Guide](#user-guide)
- [Contributing](#contributing)

## Installation

Currently you can install this plugin by cloning the repository and compiling the code yourself see [Quick Start](#quick-start) for more details.

## Quick Start

First clone the project and run `npm install` to install all dependencies. After that run `npm run build` which will create the extension and place all files in the `/dist` folder.

In Chrome go to Settings > Extensions and enable Developer mode. Then click Load unpacked and select the `/dist` folder. This will enable the extension in your browser.

## User Guide

The extension passively records form submissions in the background into a local storage when submitted. This includes all data that is submitted in the form.

To refill a form with earlier submitted data simply click the extension icon to open the popup menu. In here you'll find a history of earlier submission that have been made on this particular URL. Here you can simply click on one of the buttons to refill all the data of that entry.

> [!IMPORTANT]
> The form submissions are stored per page/URL. This is because some websites have forms with multiple steps where each step is a single form. This makes it easier to distinguish which entry is part of which form.

## Contributing

All contributions are welcome and I will gladly take all the support I can get on this project. If you want to contribute please visit the [contribution guide](.github/CONTRIBUTING.md) for details on how to contribute.

## Sponser

If you want to support this project or want to buy me a coffee you can do so [here](https://buymeacoffee.com/justinleemans).