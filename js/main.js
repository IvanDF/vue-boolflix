/**************
 * BOOLFLIX
 *************/

const boolFlix = new Vue ({

    el: ('#boolFlix'),

    data: {

        search:'',

        movieList: [],

    },

    methods: {

        filterSearch(){

            if ( this.search.length >= 3 ) {
                this.movies()
            }



        },

        movies() {
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '60978fe417c91cef357193610fbcdac9',
                    language: 'it-IT',
                    query: this.search

                }
            })
            .then( valid => {
                // handle success
                this.movieList = valid.data.results
                console.log(valid.data.results);
              })
              .catch( invalid => {
                // handle error
                console.log(invalid);
              })
        }

    },

});