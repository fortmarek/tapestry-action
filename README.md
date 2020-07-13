# Tapestry

This action runs [tapestry release `tag`](https://github.com/ackeecz/tapestry) where tag will be the last one you push to the repository.

To get yourself going, add the following to `TapestryConfig.swift` release steps:
`.post(.githubRelease(owner: "owner", repository: "repository", assetPaths: ["build.zip"]))`
where `assetPaths` are paths to zip archives you wish to upload alongside the Github release.

Afterwards, you will need to define a workflow:

```
name: Release

on:
  push:
    tags:
      - '*'

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ref: master
          fetch-depth: 0
      - name: Create a new release
        uses: fortmarek/tapestry-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

And that's all! Now whenever you push a new tag to your repository, a new release will be created for you automatically!