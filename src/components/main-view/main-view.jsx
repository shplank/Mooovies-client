import React from 'react';

import { FilmCard } from '../film-card/film-card';

import { FilmView } from '../film-view/film-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      films: [
        {
          "Genre": [
            "60c270de97a33ec06abe217f"
          ],
          "Director": [
            "60c2786097a33ec06abe2186"
          ],
          "_id": "60ba5f274241cd6da42cd2fc",
          "Title": "Lost in Translation",
          "ReleaseYear": "2003",
          "Description": "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
          "ImagePath": "https://upload.wikimedia.org/wikipedia/en/4/4c/Lost_in_Translation_poster.jpg",
          "Featured": true
        },
        {
          "Genre": [
            "60c2711997a33ec06abe2181"
          ],
          "Director": [
            "60c2783197a33ec06abe2184"
          ],
          "_id": "60ba4e014241cd6da42cd2fa",
          "Title": "Get Out",
          "ReleaseYear": "2017",
          "Description": "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
          "ImagePath": "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png",
          "Featured": true
        },
        {
          "Genre": [
            "60c2710197a33ec06abe2180"
          ],
          "Director": [
            "60c2787b97a33ec06abe2187"
          ],
          "_id": "60ba62264241cd6da42cd2fd",
          "Title": "Raising Arizona",
          "ReleaseYear": "1987",
          "Description": "When a childless couple of an ex-con and an ex-cop decide to help themselves to one of another family's quintuplets, their lives become more complicated than they anticipated.",
          "ImagePath": "https://upload.wikimedia.org/wikipedia/en/3/31/Raising-Arizona-Poster.jpg",
          "Featured": false
        },
        {
          "Genre": [
            "60c2712e97a33ec06abe2182"
          ],
          "Director": [
            "60c2784497a33ec06abe2185"
          ],
          "_id": "60ba5d904241cd6da42cd2fb",
          "Title": "Pulp Fiction",
          "ReleaseYear": "1994",
          "Description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
          "ImagePath": "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
          "Featured": false
        },
        {
          "Genre": [
            "60c2710197a33ec06abe2180"
          ],
          "Director": [
            "60c2789797a33ec06abe2188"
          ],
          "_id": "60ba65a24241cd6da42cd2ff",
          "Title": "Lady Bird",
          "ReleaseYear": "2017",
          "Description": "A nurse works tirelessly to keep her family afloat after her husband loses his job. She also maintains a turbulent bond with a teenage daughter who is just like her: loving, strong-willed and deeply opinionated.",
          "ImagePath": "https://upload.wikimedia.org/wikipedia/en/6/61/Lady_Bird_poster.jpeg",
          "Featured": false
        },
        {
          "Genre": [
            "60c2712e97a33ec06abe2182"
          ],
          "Director": [
            "60c2787b97a33ec06abe2187"
          ],
          "_id": "60ba62514241cd6da42cd2fe",
          "Title": "Fargo",
          "ReleaseYear": "1996",
          "Description": "Jerry Lundegaard's inept crime falls apart due to his and his henchmen's bungling and the persistent police work of the quite pregnant Marge Gunderson.",
          "ImagePath": "https://static.wikia.nocookie.net/fargo/images/d/d7/Fargo_movieposter.jpg/revision/latest?cb=20140226224031",
          "Featured": true
        },
        {
          "Genre": [
            "60c2714597a33ec06abe2183"
          ],
          "Director": [
            "60c278bc97a33ec06abe218a"
          ],
          "_id": "60ba72d54241cd6da42cd301",
          "Title": "Life of Pi",
          "ReleaseYear": "2012",
          "Description": "A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery. While cast away, he forms an unexpected connection with another survivor: a fearsome Bengal tiger.",
          "ImagePath": "https://upload.wikimedia.org/wikipedia/en/5/57/Life_of_Pi_2012_Poster.jpg",
          "Featured": true
        },
        {
          "Genre": [
            "60c270de97a33ec06abe217f"
          ],
          "Director": [
            "60c278a997a33ec06abe2189"
          ],
          "_id": "60ba68414241cd6da42cd300",
          "Title": "The Favourite",
          "ReleaseYear": "2018",
          "Description": "In early 18th-century England, the status quo at the court is upset when a new servant arrives and endears herself to a frail Queen Anne.",
          "ImagePath": "https://cdn.shopify.com/s/files/1/1416/8662/products/Favourite_2018_styleD_original_film-art_1200x.jpg?v=1614794959",
          "Featured": false
        },
        {
          "Genre": [
            "60c270c697a33ec06abe217e"
          ],
          "Director": [
            "60c278ce97a33ec06abe218b"
          ],
          "_id": "60ba72f34241cd6da42cd302",
          "Title": "Mulholland Dr.",
          "ReleaseYear": "2001",
          "Description": "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues and answers across Los Angeles in a twisting venture beyond dreams and reality.",
          "ImagePath": "https://upload.wikimedia.org/wikipedia/en/0/0f/Mulholland.png",
          "Featured": false
        },
        {
          "Genre": [
            "60c2710197a33ec06abe2180"
          ],
          "Director": [
            "60c278e297a33ec06abe218c"
          ],
          "_id": "60ba4de04241cd6da42cd2f9",
          "Title": "Parasite",
          "ReleaseYear": "2019",
          "Description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
          "ImagePath": "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
          "Featured": true
        }
      ],
      selectedFilm: null
    }
  }

  setSelectedFilm(newSelectedFilm) {
    this.setState({
      selectedFilm: newSelectedFilm
    });
  }

  render() {
    const { films, selectedFilm } = this.state;

    if (selectedFilm) return <FilmView film={selectedFilm} />;

    if (films.length === 0) return <div className="main-view">No movies for you!</div>;

    return (
      <div className="main-view">
        {selectedFilm
          ? <filmView film={selectedFilm} onBackClick={newSelectedFilm => { this.setSelectedFilm(newSelectedFilm); }} />
          : films.map(film => <FilmCard key={film._id} film={film} onFilmClick={(film) => { this.setSelectedFilm(film) }} />)}
      </div>
    );
  }
}
