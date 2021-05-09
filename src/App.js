import React, { useState, useEffect } from 'react';
import { AppProvider, Layout, Page, Banner } from '@shopify/polaris';
import { NominationsList, SearchBar, SearchResults, CustomMovies } from './components';
import '@shopify/polaris/dist/styles.css';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations")) || []
  );
  const [customMoviesLibrary, setCustomMoviesLibrary] = useState(
    JSON.parse(localStorage.getItem("customMovies")) || []
  );
  const [ID, setID] = useState(
    parseInt(localStorage.getItem("customMoviesID")) || customMoviesLibrary.length
  );

  const API_KEY = "a53f9bdb";

  const removeDuplicates = (arr) => {
    const returnArray = [];

    for (let element of arr) {
      const idx = returnArray.findIndex((item) => {
        return item.id === element.id;
      });

      if (idx === -1) {
        returnArray.push(element);
      }
    }

    console.log(returnArray);
    return returnArray;
  }

  const getResults = async () => {
    if (searchTerm !== '') {
      const url = `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${API_KEY}`;

      const res = await axios.get(url);

      if (res?.data?.Search) {
        const fullYet = nominations.length === 5;
        const results = res.data.Search.map((item) => {
          return {
            id: item.imdbID,
            title: item.Title,
            year: item.Year,
            nominated: nominations.findIndex((nom) => {
              return nom.id === item.imdbID
            }) > -1,
            full: fullYet,
          }
        });

        const resultsNoDupes = removeDuplicates(results);

        setSearchResults([...resultsNoDupes]);
      }
    } else {
      setSearchResults([]);
    }

  };

  useEffect(() => {
    getResults();
  }, [searchTerm]);

  const addNomination = (id) => {

    if (nominations.length < 5) {

      if (id.slice(0, 2) === 'cm') {
        const result = customMoviesLibrary.find((item) => {
          return item.id === id;
        });

        const resultIdx = customMoviesLibrary.findIndex((item) => {
          return item.id === id;
        });

        const newNomineeArray = nominations.concat([result]);
        const newCustomLibrary = customMoviesLibrary;
        newCustomLibrary[resultIdx].nominated = true;
        setNominations([...newNomineeArray]);
        setCustomMoviesLibrary([...newCustomLibrary]);
      } else {

        const result = searchResults.find((item) => {
          return item.id === id;
        });

        const resultIdx = searchResults.findIndex((item) => {
          return item.id === id;
        });

        const newNomineeArray = nominations.concat([result]);
        const newResultArray = searchResults;
        newResultArray[resultIdx].nominated = true;
        setNominations([...newNomineeArray]);
        setSearchResults([...newResultArray]);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(nominations));
  }, [nominations]);

  const removeNomination = (id) => {
    const removalIdx = nominations.findIndex((item) => {
      return item.id === id;
    });

    const newNomineeArray = nominations;
    newNomineeArray.splice(removalIdx, 1);
    const newResultArray = searchResults;
    const newCustomLibrary = customMoviesLibrary;

    if (id.slice(0, 2) === "cm") {
      const customIdx = customMoviesLibrary.findIndex((item) => {
        return item.id === id;
      });

      if (customIdx > -1) {
        newCustomLibrary[customIdx].nominated = false;
      }

      setCustomMoviesLibrary([...newCustomLibrary]);
    } else {
      const resultIdx = searchResults.findIndex((item) => {
        return item.id === id;
      });

      if (resultIdx > -1) {
        newResultArray[resultIdx].nominated = false;
      }

      setSearchResults([...newResultArray]);
    }

    setNominations([...newNomineeArray]);
  };

  const bannerMarkup = (
    <Banner
      title="Thank you for choosing five nominees!"
      status="success"
    />
  );

  useEffect(() => {
    localStorage.setItem("customMovies", JSON.stringify(customMoviesLibrary));
  }, [customMoviesLibrary]);

  const createMovie = (title, year) => {
    const newMovie = {
      title: title,
      year: year,
      id: 'cm' + ID,
      nominated: false,
      full: nominations.length === 5
    };

    setID(ID + 1);

    const newLibrary = customMoviesLibrary.concat([newMovie]);
    setCustomMoviesLibrary([...newLibrary]);

  };

  const deleteMovie = (id) => {
    const removalIdx = customMoviesLibrary.findIndex((item) => {
      return item.id === id;
    });

    const newCustomLibrary = customMoviesLibrary;
    newCustomLibrary.splice(removalIdx, 1);

    setCustomMoviesLibrary([...newCustomLibrary]);
  };

  useEffect(() => {
    localStorage.setItem("customMoviesID", ID.toString());
  }, [ID]);

  return (
    <AppProvider i18n={{}}>
      <Page title="The Shoppies">
        <Layout>
          {nominations.length === 5 ? (<Layout.Section>
            {bannerMarkup}
          </Layout.Section>) : null}
          <Layout.Section>
            <SearchBar value={searchTerm} onChange={setSearchTerm}
              onSearch={getResults} />
          </Layout.Section>

          <Layout.Section oneHalf>
            <SearchResults value={searchTerm} results={searchResults} nomination={addNomination} nomcount={nominations.length} />
          </Layout.Section>

          <Layout.Section oneHalf>
            <NominationsList nominations={nominations} onRemoval={removeNomination} />
          </Layout.Section>

          <Layout.Section>
            <CustomMovies onCreate={createMovie} library={customMoviesLibrary} onDelete={deleteMovie} 
            onNominate={addNomination} nomcount={nominations.length} />
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
