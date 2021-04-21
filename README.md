**WARNING: As previously announced on our communication channels, the Kytos
project will enter the "shutdown" phase on May 31, 2021. After this date,
only critical patches (security and core bug fixes) will be accepted, and the
project will be in "critical-only" mode for another six months (until November
30, 2021). For more information visit the FAQ at <https://kytos.io/faq>. We'll
have eternal gratitude to the entire community of developers and users that made
the project so far.**

# Kytos/UI

This is the web user interface for the [Kytos project](https://kytos.io). For more information
on how to use it, please refer to the [UI documentation](https://docs.kytos.io/developer/web-ui/).

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## How to create a new release

To create a new release file you need to run the command below and during the
procedure to create a new release on github you need append the file
latest.zip.

```bash
# build for production and compress the file as latest.zip
npm run build
```

After build and upload the file in the github, the Kytos has an endpoint to see
the latest release version and download the latest.zip file from github and
unpack it in the kytos/web-ui folder.

This update command can be trigger using the kytos-utils command displayed
below. If no version is specified the latest version of kytos/ui on github will
be used.

``` bash
# update the kytos web-ui to latest version
$ kytos web update

# update the kytos web-ui to a specific version
$ kytos web update <version>
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
