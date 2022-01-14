# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2022-01-14

### Fixes

-   Improved compatibility with [Vite](https://vitejs.dev) (#806)

## [1.1.1] - 2021-09-21

### Fixes

-   Fixed incompatibility with [pnpm](https://pnpm.io).
-   Fixed incompatibility with [SvelteKit](https://kit.svelte.dev).

## [1.1.0] - 2020-09-19

### Changes

-   Changed `@fullcalendar/core` required version for easier updates

## [1.0.7] - 2020-09-18

### Changes

-   Removed peerDependencies as they are peer devDependencies

## [1.0.6] - 2020-09-18

### Fixes

-   Fixed more server-side-rendering issues

## [1.0.5] - 2020-09-18

-   Updated FullCalendar to v5.3.1 ((Fixed a few bugs)[https://github.com/fullcalendar/fullcalendar/blob/master/CHANGELOG.md])

## [1.0.4] - 2020-09-18

### Fixes

-   Added missing `Draggable` import.

## [1.0.3] - 2020-09-18

### Fixes

-   `Draggable` component in now SSR compatible.

## [1.0.2] - 2020-09-12

### Fixes

-   Added `@fullcalendar/core` as a peerDependencies.
-   Added `rollup-plugin-postcss` as a peerDependencies.

## [1.0.1] - 2020-09-11

### Breaking Changes

-   Updated the component to use v5 of FullCalendar.
-   Changed the component API (see README)

## [0.4.0] - 2020-07-11

### Changes

-   Updated `fast-deep-equal`.

## [0.3.0] - 2020-03-03

-   Reduced bundle size.

## [0.2.0] - 2020-03-02

-   Added a `Draggable` component (See [official docs](https://fullcalendar.io/docs/external-dragging) for more info).

## [0.1.0] - 2020-02-14

-   Updated @fullcalendar/core to [v4.3.2](https://github.com/fullcalendar/fullcalendar/blob/master/CHANGELOG.md#v432-2020-02-11).
-   Add missing `googleCalendarApiKey` property.

## [0.0.6] - 2019-01-08

-   Bumped `fast-deep-equal` to v3.1.1.
-   Removed unused props.

## [0.0.4] - 2019-09-19

### Added

-   Add the `Svelte` property to `package.json` for better Svelte integration.

## [0.0.3] - 2019-09-19

### Added

-   Added the option to change calendar options dynamically.
-   Added `class` & `style` props.

## [0.0.2] - 2019-09-12

### Added

-   Added missing prop: `schedulerLicenseKey`.

## [0.0.1] - 2019-09-12

### Added

-   Added a Svelte-wrapped FullCalendar component.
