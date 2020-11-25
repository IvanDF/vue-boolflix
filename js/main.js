/**************
 * BOOLFLIX
 *************/

const boolFlix = new Vue ({

    el: ('#boolFlix'),

    data: {

        search:'',
        // DEFAULT LISTS
        movieList: [],
        tvList: [],
        all: [],
        // DEFAULT LANGUAGE
        language: 'it',
        languages:[ 'it', 'en', 'de'],
        filter: 'all',
        loading: false,
    },

    methods: {
        // FILTER SEARCH AND CLEAN INPUT
        filterSearchDone(){

            this.filterSearch();

            
        },
        // FILTER SEARCH
        filterSearch(){

            this.loading = false;
            
            // if ( this.search.length >= 3 ) {
                this.movies()
                // }
            
        },
        // MOVIES
        movies() {
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '60978fe417c91cef357193610fbcdac9',
                    language: this.language,
                    query: this.search
                }
            })
            .then( valid => {
                // handle success
                this.movieList = valid.data.results;

                this.tvs()
            })
            .catch( invalid => {
                // handle error
                console.log(invalid);
            })
        },
        // TV SERIES
        tvs() {
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: '60978fe417c91cef357193610fbcdac9',
                    language: this.language,
                    query: this.search

                }
            })
            .then( valid => {
                // handle success
                this.tvList = valid.data.results;

                this.search = '';

                this.loading = true;
            })
            .catch( invalid => {
                // handle error
                console.log(invalid);
            })
        },
        // SET VOTE FROM 1 TO 5
        getValutation(vote) {
            return Math.ceil( vote / 2 )
        },
        // SET DYNAMICALLY FLAGS
        checkLanguage(index) {


            for ( let i = 0 ; i < this.languages.length; i++ ) {

                if ( this.movieList[index].original_language == this.languages[i]) {
                    return true;
                }

            }

            return false;

        },
        checkLanguage2(index) {


            for ( let i = 0 ; i < this.languages.length; i++ ) {

                if ( this.movieList[index].original_language == this.languages[i]) {
                    return true;
                }

            }

            return false;

        },

    },

});