/**************
 * BOOLFLIX
 *************/

const boolFlix = new Vue ({

    el: ('#boolflix'),

    data: {

        // HEADER INDEX
        navIndex: '',

        // HEADER MENU
        headerMenu: [
            {
                item: 'Home',
                icon: 'fas fa-home',
            },
            {
                item: 'Film',
                icon: 'fas fa-film',
            },
            {
                item: 'Serie Tv',
                icon: 'fas fa-tv',
            },
            {
                item: 'Lingua',
                icon: 'fas fa-language',
                dropdown: [ 'IT', 'EN', 'DE', 'JA', 'RU' ]
            },
        ],

        // SET SEARCH INPUT
        search: '',

        filterContent: '',

        // API CONTENT

        // LANGUAGES
        lang: 'it',

        // ARRAYAS
        filmList: null,
        tvsList: null,
        
        // MEDIA ELEMENTS
        indexFilm: '',
        indexTvs: '',

        allGenres: [],
        genreSelected: 'All',


        // FLAGS
        languages:[ 'it', 'en', 'de'],

    },

    created() {

        this.getApiGenres('genre/movie/list');
        this.getApiGenres('genre/tv/list');

        setTimeout(() => {
            this.headerMenu.dropdownGenre = this.allGenres
            console.log(this.allGenres);
        }, 300);

    },

    methods: {
        // FILTER SEARCH
        filterSearch(){
            if ( this.search.length >= 3 ) {
                this.films()
                this.tvs()
            }
        },
        // POPULATING FILM LIST
        films() {
            this.getApi('search/movie')
        },
        // POPULATING TVS LIST
        tvs() {
            this.getApi('search/tv')
        },
        // POPULATING ALL GERNES
        getApiGenres(mediaUrl) {
            urlPrefix = 'https://api.themoviedb.org/3/' + mediaUrl
            axios.get(urlPrefix, {
                params: {
                    api_key: '60978fe417c91cef357193610fbcdac9',
                    language: this.lang,
                }
            })
                .then( valid => {
                    // handle success
                    this.allGenres = valid.data.genres
                })
                .catch( invalid => {
                    // handle error
                    console.log(invalid);
                })
        },
        // GET API
        getApi( mediaUrl ) {
            urlPrefix = 'https://api.themoviedb.org/3/' + mediaUrl
            axios.get(urlPrefix, {
                params: {
                    api_key: '60978fe417c91cef357193610fbcdac9',
                    language: this.lang,
                    query: this.search
                }
            })
                .then( valid => {
                    // handle success
                    if ( mediaUrl === 'search/movie' ) {
                        this.filmList = valid.data.results
                    } else if ( mediaUrl === 'search/tv' ) {
                        this.tvsList = valid.data.results
                    }
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
        // SHOW DROPDOWN
        showDropdown( el, index) {

            if ( this.navIndex === '' ) {
                this.navIndex = index
            } else {
                this.navIndex = ''
            }

            this.filterContent = el.toLowerCase()

        },
        changeLang(el) {
            this.lang = el.toLowerCase()
        },
        readDescriptionFilm(index) {
            if ( this.indexFilm === index ) {
                this.indexFilm = ''
            } else {
                this.indexFilm = index
            }
            this.indexTvs = ''
        },
        readDescriptionTvs(index) {
            if ( this.indexTvs === index ) {
                this.indexTvs = ''
            } else {
                this.indexTvs = index
            }
            this.indexFilm = ''
        },
        // ciao(){
        //     console.log(this.genreSelected);
        // }
    },

});