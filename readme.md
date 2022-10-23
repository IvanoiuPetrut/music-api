# Get song API

## Description

- Get current playing song by users across ULBS 😎

## Usage

- `GET /api/song/currently-playing` to get current playing song

  - gets a specific mp3 file from the server

- `POST /api/song/currently-playing` to set current playing song

  - sets a specific mp3 file from the server

  ```json
  {
    "songTitle": "Gone"
  }
  ```
