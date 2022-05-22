import { useState, useEffect, useRef } from "react";
import Container from "../components/Container";
import { transformAlbums } from "../utils/functions";
import { TGroupedAlbum } from "../utils/types";
import { useSearchParams } from "react-router-dom";
import Album from "../components/AlbumTile";

function Albums() {
  let limit = 100;
  let offset = useRef(0);

  const [albums, setAlbums] = useState<TGroupedAlbum[]>([]);

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q"));

  useEffect(() => setQuery(searchParams.get("q")), [searchParams.get("q")]);

  const [bottomHit, setBottomHit] = useState(false);

  let abortController: AbortController | null = null;

  async function getAlbums() {
    abortController = new AbortController();

    const response = await fetch("http://localhost:5500/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit,
        offset: offset.current,
        search: query,
      }),
      signal: abortController.signal,
    });
    const data = await response.json();
    console.log(data);

    const albumsGrouped = transformAlbums(data.albums[0]);
    console.log(albumsGrouped);

    return albumsGrouped;
  }

  async function updateAlbums() {
    const tracksGrouped = await getAlbums();

    if (offset.current === 0) {
      setAlbums(tracksGrouped);
    } else {
      setAlbums((tracks) => [...tracks, ...tracksGrouped]);
    }

    setBottomHit(false);
  }

  function incrementOffset() {
    offset.current += limit;
  }

  function updateAlbumsOnScroll() {
    incrementOffset();
    updateAlbums();
  }

  function updateAlbumsOnQueryChange() {
    setAlbums([]);
    offset.current = 0;
    updateAlbums();
  }

  useEffect(updateAlbumsOnQueryChange, [query]);

  return (
    <Container
      layout="grid"
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
      updateData={updateAlbumsOnScroll}
      abortController={abortController}
    >
      {albums?.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </Container>
  );
}

export default Albums;
