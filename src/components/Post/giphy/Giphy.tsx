//need to find an good

/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Giphy.module.scss";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LoadingThreeDots } from "../../Utility/LoadingThreeDots";

function Giphy({ closeModalHandler, editor }: any) {
  const [gifs, setGif] = useState<any>([]);
  const [term, setTerm] = useState("");
  const [limit, setLimit] = useState(20);
  const [input_ref, setInput] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    const term = input_ref.value;

    search(term);
  };

  useEffect(() => {
    search("", "trend");
  }, []);

  const search = (term: string, kind = "search") => {
    setIsLoading(true);
    const url =
      kind === "search"
        ? `https://api.giphy.com/v1/gifs/search?q=${term}`
        : `https://api.giphy.com/v1/gifs/trending?q=${term}`;
    const link = `${url}&limit=${limit}&api_key=KpSOOvXbvl7rusKvx7Axl8BFI2QjmYXY`;

    axios
      .get(link)
      .then((response) => {
        setGif(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setTerm(term);
  };

  const addImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchbox}>
        <input
          ref={(c) => setInput(c)}
          type="text"
          placeholder={"search gif"}
          value={term}
          onChange={handleChange}
          onKeyDown={onSearchSubmit}
        />
      </div>
      <div className={styles.gridwrapper} onClick={closeModalHandler}>
        {isLoading ? (
          <LoadingThreeDots />
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry columnsCount={3} gutter="10px">
              {gifs.map((item: any, index: number) => (
                // eslint-disable-next-line @next/next/no-img-element

                <img
                  src={item.images.fixed_width_downsampled.url}
                  alt="an picture of gif"
                  className={styles.image}
                  key={index}
                  onClick={() => {
                    addImage(item.images.fixed_width_downsampled.url);
                  }}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </div>
  );
}

export { Giphy };
