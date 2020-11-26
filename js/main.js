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

        // FILTER
        filter: 'all',

    methods: {
        // FILTER SEARCH AND CLEAN INPUT
        filterSearchDone(){
            this.filterSearch();
            this.search = '';
        },
        // FILTER SEARCH
        filterSearch(){
            if ( this.search.length >= 3 ) {
                this.movies()
                this.tvs()
            }
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
                    query: this.search,
                }
            })
            .then( valid => {
                // handle success
                this.tvList = valid.data.results;
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
        checkLanguage( el ) {
              return this.languages.includes( el.original_language ) ? true : false
        },
    },

});