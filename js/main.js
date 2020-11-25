/**************
 * BOOLFLIX
 *************/

const boolFlix = new Vue ({

    el: ('#boolFlix'),

    data: {

        search:'',
        movieList: '',
        tvList: [],
        language: 'it',
    },

    methods: {

        filterSearchDone(){

            this.filterSearch();

            this.search = '';

        },

        filterSearch(){

            if ( this.search.length >= 3 ) {
                this.movies()
                this.tvs()
            }

        },

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
                this.movieList = valid.data.results
            })
            .catch( invalid => {
                // handle error
                console.log(invalid);
            })
        },

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
                this.tvList = valid.data.results
            })
            .catch( invalid => {
                // handle error
                console.log(invalid);
            })
        },

        getValutation(vote) {
            return Math.ceil( vote / 2 )
        },

    },

});